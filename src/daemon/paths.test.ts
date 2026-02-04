import path from "node:path";
import { describe, expect, it } from "vitest";
import { resolveGatewayStateDir } from "./paths.js";

describe("resolveGatewayStateDir", () => {
  it("uses the default state dir when no overrides are set", () => {
    const env = { HOME: "/Users/test" };
    expect(resolveGatewayStateDir(env)).toBe(path.join("/Users/test", ".cml-hive-assist"));
  });

  it("appends the profile suffix when set", () => {
    const env = { HOME: "/Users/test", CML_HIVE_ASSIST_PROFILE: "rescue" };
    expect(resolveGatewayStateDir(env)).toBe(path.join("/Users/test", ".cml-hive-assist-rescue"));
  });

  it("treats default profiles as the base state dir", () => {
    const env = { HOME: "/Users/test", CML_HIVE_ASSIST_PROFILE: "Default" };
    expect(resolveGatewayStateDir(env)).toBe(path.join("/Users/test", ".cml-hive-assist"));
  });

  it("uses CML_HIVE_ASSIST_STATE_DIR when provided", () => {
    const env = { HOME: "/Users/test", CML_HIVE_ASSIST_STATE_DIR: "/var/lib/cml-hive-assist" };
    expect(resolveGatewayStateDir(env)).toBe(path.resolve("/var/lib/cml-hive-assist"));
  });

  it("expands ~ in CML_HIVE_ASSIST_STATE_DIR", () => {
    const env = { HOME: "/Users/test", CML_HIVE_ASSIST_STATE_DIR: "~/cml-hive-assist-state" };
    expect(resolveGatewayStateDir(env)).toBe(path.resolve("/Users/test/cml-hive-assist-state"));
  });

  it("preserves Windows absolute paths without HOME", () => {
    const env = { CML_HIVE_ASSIST_STATE_DIR: "C:\\State\\cml-hive-assist" };
    expect(resolveGatewayStateDir(env)).toBe("C:\\State\\cml-hive-assist");
  });
});
