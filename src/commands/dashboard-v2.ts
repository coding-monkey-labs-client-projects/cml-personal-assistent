import type { RuntimeEnv } from "../runtime.ts";
import { readConfigFileSnapshot, resolveGatewayPort } from "../config/config.ts";
import { getControlUiV2Prefix } from "../gateway/control-ui-v2.ts";
import { copyToClipboard } from "../infra/clipboard.ts";
import { defaultRuntime } from "../runtime.ts";
import { detectBrowserOpenSupport, openUrl, resolveControlUiLinks } from "./onboard-helpers.ts";

type DashboardV2Options = {
  noOpen?: boolean;
};

export async function dashboardV2Command(
  runtime: RuntimeEnv = defaultRuntime,
  options: DashboardV2Options = {},
) {
  const snapshot = await readConfigFileSnapshot();
  const cfg = snapshot.valid ? snapshot.config : {};
  const port = resolveGatewayPort(cfg);
  const bind = cfg.gateway?.bind ?? "loopback";
  const customBindHost = cfg.gateway?.customBindHost;
  const token = cfg.gateway?.auth?.token ?? process.env.CML_HIVE_ASSIST_GATEWAY_TOKEN ?? "";

  // For v2 UI, we use the /v2 path instead of the configured basePath
  const v2Prefix = getControlUiV2Prefix();
  const links = resolveControlUiLinks({
    port,
    bind,
    customBindHost,
    basePath: v2Prefix,
  });
  const authedUrl = token ? `${links.httpUrl}?token=${encodeURIComponent(token)}` : links.httpUrl;

  runtime.log(`Dashboard V2 URL: ${authedUrl}`);

  const copied = await copyToClipboard(authedUrl).catch(() => false);
  runtime.log(copied ? "Copied to clipboard." : "Copy to clipboard unavailable.");

  let opened = false;
  let hint: string | undefined;
  if (!options.noOpen) {
    const browserSupport = await detectBrowserOpenSupport();
    if (browserSupport.ok) {
      opened = await openUrl(authedUrl);
    }
    if (!opened) {
      hint = `Open the URL above in your browser to access the new V2 Control UI.`;
    }
  } else {
    hint = "Browser launch disabled (--no-open). Use the URL above.";
  }

  if (opened) {
    runtime.log("Opened in your browser. This is the new V2 Control UI.");
  } else if (hint) {
    runtime.log(hint);
  }
}
