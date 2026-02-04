import type { IncomingMessage, ServerResponse } from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { CmlHiveAssistConfig } from "../config/config.ts";

const V2_UI_PREFIX = "/v2";

export type ControlUiV2RequestOptions = {
  config?: CmlHiveAssistConfig;
};

function resolveControlUiV2Root(): string | null {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const execDir = (() => {
    try {
      return path.dirname(fs.realpathSync(process.execPath));
    } catch {
      return null;
    }
  })();
  const candidates = [
    // Packaged app: cml-hive-assist-ui lives alongside the executable.
    execDir ? path.resolve(execDir, "cml-hive-assist-ui") : null,
    // Running from dist: dist/gateway/control-ui-v2.js -> dist/cml-hive-assist-ui
    path.resolve(here, "../cml-hive-assist-ui"),
    // Running from source: src/gateway/control-ui-v2.ts -> dist/cml-hive-assist-ui
    path.resolve(here, "../../dist/cml-hive-assist-ui"),
    // Fallback to cwd (dev)
    path.resolve(process.cwd(), "dist", "cml-hive-assist-ui"),
  ].filter((dir): dir is string => Boolean(dir));
  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, "index.html"))) {
      return dir;
    }
  }
  return null;
}

function contentTypeForExt(ext: string): string {
  switch (ext) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".js":
      return "application/javascript; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".json":
    case ".map":
      return "application/json; charset=utf-8";
    case ".svg":
      return "image/svg+xml";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    case ".webp":
      return "image/webp";
    case ".ico":
      return "image/x-icon";
    case ".txt":
      return "text/plain; charset=utf-8";
    default:
      return "application/octet-stream";
  }
}

function respondNotFound(res: ServerResponse) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end("Not Found");
}

function serveFile(res: ServerResponse, filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  res.setHeader("Content-Type", contentTypeForExt(ext));
  res.setHeader("Cache-Control", "no-cache");
  res.end(fs.readFileSync(filePath));
}

interface ControlUiV2InjectionOpts {
  basePath: string;
}

function injectControlUiV2Config(html: string, opts: ControlUiV2InjectionOpts): string {
  const { basePath } = opts;
  const script =
    `<script>` +
    `window.__CML_HIVE_ASSIST_UI_V2_BASE_PATH__=${JSON.stringify(basePath)};` +
    `</script>`;
  // Check if already injected
  if (html.includes("__CML_HIVE_ASSIST_UI_V2_BASE_PATH__")) {
    return html;
  }
  const headClose = html.indexOf("</head>");
  if (headClose !== -1) {
    return `${html.slice(0, headClose)}${script}${html.slice(headClose)}`;
  }
  return `${script}${html}`;
}

function serveIndexHtml(res: ServerResponse, indexPath: string, opts: { basePath: string }) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache");
  const raw = fs.readFileSync(indexPath, "utf8");
  res.end(
    injectControlUiV2Config(raw, {
      basePath: opts.basePath,
    }),
  );
}

function isSafeRelativePath(relPath: string) {
  if (!relPath) {
    return false;
  }
  const normalized = path.posix.normalize(relPath);
  if (normalized.startsWith("../") || normalized === "..") {
    return false;
  }
  if (normalized.includes("\0")) {
    return false;
  }
  return true;
}

/**
 * Handles HTTP requests for the v2 UI at /v2/ path
 */
export function handleControlUiV2HttpRequest(
  req: IncomingMessage,
  res: ServerResponse,
  opts?: ControlUiV2RequestOptions,
): boolean {
  const urlRaw = req.url;
  if (!urlRaw) {
    return false;
  }
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Method Not Allowed");
    return true;
  }

  const url = new URL(urlRaw, "http://localhost");
  const pathname = url.pathname;

  // Only handle /v2 and /v2/* paths
  if (pathname !== V2_UI_PREFIX && !pathname.startsWith(`${V2_UI_PREFIX}/`)) {
    return false;
  }

  // Redirect /v2 to /v2/
  if (pathname === V2_UI_PREFIX) {
    res.statusCode = 302;
    res.setHeader("Location", `${V2_UI_PREFIX}/${url.search}`);
    res.end();
    return true;
  }

  const root = resolveControlUiV2Root();
  if (!root) {
    res.statusCode = 503;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end(
      "V2 UI assets not found. Build them with `pnpm ui2:build`, or run `pnpm ui2:dev` during development.",
    );
    return true;
  }

  // Strip /v2 prefix to get the relative path
  const uiPath = pathname.slice(V2_UI_PREFIX.length);
  const rel = (() => {
    if (uiPath === "/" || uiPath === "") {
      return "";
    }
    const assetsIndex = uiPath.indexOf("/assets/");
    if (assetsIndex >= 0) {
      return uiPath.slice(assetsIndex + 1);
    }
    return uiPath.slice(1);
  })();
  const requested = rel && !rel.endsWith("/") ? rel : `${rel}index.html`;
  const fileRel = requested || "index.html";
  if (!isSafeRelativePath(fileRel)) {
    respondNotFound(res);
    return true;
  }

  const filePath = path.join(root, fileRel);
  if (!filePath.startsWith(root)) {
    respondNotFound(res);
    return true;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    if (path.basename(filePath) === "index.html") {
      serveIndexHtml(res, filePath, {
        basePath: V2_UI_PREFIX,
      });
      return true;
    }
    serveFile(res, filePath);
    return true;
  }

  // SPA fallback (client-side router): serve index.html for unknown paths.
  const indexPath = path.join(root, "index.html");
  if (fs.existsSync(indexPath)) {
    serveIndexHtml(res, indexPath, {
      basePath: V2_UI_PREFIX,
    });
    return true;
  }

  respondNotFound(res);
  return true;
}

/**
 * Returns the v2 UI path prefix
 */
export function getControlUiV2Prefix(): string {
  return V2_UI_PREFIX;
}
