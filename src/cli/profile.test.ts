import path from "node:path";
import { describe, expect, it } from "vitest";
import { formatCliCommand } from "./command-format.js";
import { applyCliProfileEnv, parseCliProfileArgs } from "./profile.js";

describe("parseCliProfileArgs", () => {
  it("leaves gateway --dev for subcommands", () => {
    const res = parseCliProfileArgs([
      "node",
      "cml-hive-assist",
      "gateway",
      "--dev",
      "--allow-unconfigured",
    ]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBeNull();
    expect(res.argv).toEqual([
      "node",
      "cml-hive-assist",
      "gateway",
      "--dev",
      "--allow-unconfigured",
    ]);
  });

  it("still accepts global --dev before subcommand", () => {
    const res = parseCliProfileArgs(["node", "cml-hive-assist", "--dev", "gateway"]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("dev");
    expect(res.argv).toEqual(["node", "cml-hive-assist", "gateway"]);
  });

  it("parses --profile value and strips it", () => {
    const res = parseCliProfileArgs(["node", "cml-hive-assist", "--profile", "work", "status"]);
    if (!res.ok) {
      throw new Error(res.error);
    }
    expect(res.profile).toBe("work");
    expect(res.argv).toEqual(["node", "cml-hive-assist", "status"]);
  });

  it("rejects missing profile value", () => {
    const res = parseCliProfileArgs(["node", "cml-hive-assist", "--profile"]);
    expect(res.ok).toBe(false);
  });

  it("rejects combining --dev with --profile (dev first)", () => {
    const res = parseCliProfileArgs([
      "node",
      "cml-hive-assist",
      "--dev",
      "--profile",
      "work",
      "status",
    ]);
    expect(res.ok).toBe(false);
  });

  it("rejects combining --dev with --profile (profile first)", () => {
    const res = parseCliProfileArgs([
      "node",
      "cml-hive-assist",
      "--profile",
      "work",
      "--dev",
      "status",
    ]);
    expect(res.ok).toBe(false);
  });
});

describe("applyCliProfileEnv", () => {
  it("fills env defaults for dev profile", () => {
    const env: Record<string, string | undefined> = {};
    applyCliProfileEnv({
      profile: "dev",
      env,
      homedir: () => "/home/peter",
    });
    const expectedStateDir = path.join("/home/peter", ".cml-hive-assist-dev");
    expect(env.CML_HIVE_ASSIST_PROFILE).toBe("dev");
    expect(env.CML_HIVE_ASSIST_STATE_DIR).toBe(expectedStateDir);
    expect(env.CML_HIVE_ASSIST_CONFIG_PATH).toBe(
      path.join(expectedStateDir, "cml-hive-assist.json"),
    );
    expect(env.CML_HIVE_ASSIST_GATEWAY_PORT).toBe("19001");
  });

  it("does not override explicit env values", () => {
    const env: Record<string, string | undefined> = {
      CML_HIVE_ASSIST_STATE_DIR: "/custom",
      CML_HIVE_ASSIST_GATEWAY_PORT: "19099",
    };
    applyCliProfileEnv({
      profile: "dev",
      env,
      homedir: () => "/home/peter",
    });
    expect(env.CML_HIVE_ASSIST_STATE_DIR).toBe("/custom");
    expect(env.CML_HIVE_ASSIST_GATEWAY_PORT).toBe("19099");
    expect(env.CML_HIVE_ASSIST_CONFIG_PATH).toBe(path.join("/custom", "cml-hive-assist.json"));
  });
});

describe("formatCliCommand", () => {
  it("returns command unchanged when no profile is set", () => {
    expect(formatCliCommand("cml-hive-assist doctor --fix", {})).toBe(
      "cml-hive-assist doctor --fix",
    );
  });

  it("returns command unchanged when profile is default", () => {
    expect(
      formatCliCommand("cml-hive-assist doctor --fix", { CML_HIVE_ASSIST_PROFILE: "default" }),
    ).toBe("cml-hive-assist doctor --fix");
  });

  it("returns command unchanged when profile is Default (case-insensitive)", () => {
    expect(
      formatCliCommand("cml-hive-assist doctor --fix", { CML_HIVE_ASSIST_PROFILE: "Default" }),
    ).toBe("cml-hive-assist doctor --fix");
  });

  it("returns command unchanged when profile is invalid", () => {
    expect(
      formatCliCommand("cml-hive-assist doctor --fix", { CML_HIVE_ASSIST_PROFILE: "bad profile" }),
    ).toBe("cml-hive-assist doctor --fix");
  });

  it("returns command unchanged when --profile is already present", () => {
    expect(
      formatCliCommand("cml-hive-assist --profile work doctor --fix", {
        CML_HIVE_ASSIST_PROFILE: "work",
      }),
    ).toBe("cml-hive-assist --profile work doctor --fix");
  });

  it("returns command unchanged when --dev is already present", () => {
    expect(
      formatCliCommand("cml-hive-assist --dev doctor", { CML_HIVE_ASSIST_PROFILE: "dev" }),
    ).toBe("cml-hive-assist --dev doctor");
  });

  it("inserts --profile flag when profile is set", () => {
    expect(
      formatCliCommand("cml-hive-assist doctor --fix", { CML_HIVE_ASSIST_PROFILE: "work" }),
    ).toBe("cml-hive-assist --profile work doctor --fix");
  });

  it("trims whitespace from profile", () => {
    expect(
      formatCliCommand("cml-hive-assist doctor --fix", {
        CML_HIVE_ASSIST_PROFILE: "  jbcml-hive-assist  ",
      }),
    ).toBe("cml-hive-assist --profile jbcml-hive-assist doctor --fix");
  });

  it("handles command with no args after cml-hive-assist", () => {
    expect(formatCliCommand("cml-hive-assist", { CML_HIVE_ASSIST_PROFILE: "test" })).toBe(
      "cml-hive-assist --profile test",
    );
  });

  it("handles pnpm wrapper", () => {
    expect(
      formatCliCommand("pnpm cml-hive-assist doctor", { CML_HIVE_ASSIST_PROFILE: "work" }),
    ).toBe("pnpm cml-hive-assist --profile work doctor");
  });
});
