import { describe, expect, it } from "vitest";
import {
  buildParseArgv,
  getFlagValue,
  getCommandPath,
  getPrimaryCommand,
  getPositiveIntFlagValue,
  getVerboseFlag,
  hasHelpOrVersion,
  hasFlag,
  shouldMigrateState,
  shouldMigrateStateFromPath,
} from "./argv.js";

describe("argv helpers", () => {
  it("detects help/version flags", () => {
    expect(hasHelpOrVersion(["node", "cml-hive-assist", "--help"])).toBe(true);
    expect(hasHelpOrVersion(["node", "cml-hive-assist", "-V"])).toBe(true);
    expect(hasHelpOrVersion(["node", "cml-hive-assist", "status"])).toBe(false);
  });

  it("extracts command path ignoring flags and terminator", () => {
    expect(getCommandPath(["node", "cml-hive-assist", "status", "--json"], 2)).toEqual(["status"]);
    expect(getCommandPath(["node", "cml-hive-assist", "agents", "list"], 2)).toEqual(["agents", "list"]);
    expect(getCommandPath(["node", "cml-hive-assist", "status", "--", "ignored"], 2)).toEqual(["status"]);
  });

  it("returns primary command", () => {
    expect(getPrimaryCommand(["node", "cml-hive-assist", "agents", "list"])).toBe("agents");
    expect(getPrimaryCommand(["node", "cml-hive-assist"])).toBeNull();
  });

  it("parses boolean flags and ignores terminator", () => {
    expect(hasFlag(["node", "cml-hive-assist", "status", "--json"], "--json")).toBe(true);
    expect(hasFlag(["node", "cml-hive-assist", "--", "--json"], "--json")).toBe(false);
  });

  it("extracts flag values with equals and missing values", () => {
    expect(getFlagValue(["node", "cml-hive-assist", "status", "--timeout", "5000"], "--timeout")).toBe(
      "5000",
    );
    expect(getFlagValue(["node", "cml-hive-assist", "status", "--timeout=2500"], "--timeout")).toBe(
      "2500",
    );
    expect(getFlagValue(["node", "cml-hive-assist", "status", "--timeout"], "--timeout")).toBeNull();
    expect(getFlagValue(["node", "cml-hive-assist", "status", "--timeout", "--json"], "--timeout")).toBe(
      null,
    );
    expect(getFlagValue(["node", "cml-hive-assist", "--", "--timeout=99"], "--timeout")).toBeUndefined();
  });

  it("parses verbose flags", () => {
    expect(getVerboseFlag(["node", "cml-hive-assist", "status", "--verbose"])).toBe(true);
    expect(getVerboseFlag(["node", "cml-hive-assist", "status", "--debug"])).toBe(false);
    expect(getVerboseFlag(["node", "cml-hive-assist", "status", "--debug"], { includeDebug: true })).toBe(
      true,
    );
  });

  it("parses positive integer flag values", () => {
    expect(getPositiveIntFlagValue(["node", "cml-hive-assist", "status"], "--timeout")).toBeUndefined();
    expect(
      getPositiveIntFlagValue(["node", "cml-hive-assist", "status", "--timeout"], "--timeout"),
    ).toBeNull();
    expect(
      getPositiveIntFlagValue(["node", "cml-hive-assist", "status", "--timeout", "5000"], "--timeout"),
    ).toBe(5000);
    expect(
      getPositiveIntFlagValue(["node", "cml-hive-assist", "status", "--timeout", "nope"], "--timeout"),
    ).toBeUndefined();
  });

  it("builds parse argv from raw args", () => {
    const nodeArgv = buildParseArgv({
      programName: "cml-hive-assist",
      rawArgs: ["node", "cml-hive-assist", "status"],
    });
    expect(nodeArgv).toEqual(["node", "cml-hive-assist", "status"]);

    const versionedNodeArgv = buildParseArgv({
      programName: "cml-hive-assist",
      rawArgs: ["node-22", "cml-hive-assist", "status"],
    });
    expect(versionedNodeArgv).toEqual(["node-22", "cml-hive-assist", "status"]);

    const versionedNodeWindowsArgv = buildParseArgv({
      programName: "cml-hive-assist",
      rawArgs: ["node-22.2.0.exe", "cml-hive-assist", "status"],
    });
    expect(versionedNodeWindowsArgv).toEqual(["node-22.2.0.exe", "cml-hive-assist", "status"]);

    const versionedNodePatchlessArgv = buildParseArgv({
      programName: "cml-hive-assist",
      rawArgs: ["node-22.2", "cml-hive-assist", "status"],
    });
    expect(versionedNodePatchlessArgv).toEqual(["node-22.2", "cml-hive-assist", "status"]);

    const versionedNodeWindowsPatchlessArgv = buildParseArgv({
      programName: "cml-hive-assist",
      rawArgs: ["node-22.2.exe", "cml-hive-assist", "status"],
    });
    expect(versionedNodeWindowsPatchlessArgv).toEqual(["node-22.2.exe", "cml-hive-assist", "status"]);

    const versionedNodeWithPathArgv = buildParseArgv({
      programName: "cml-hive-assist",
      rawArgs: ["/usr/bin/node-22.2.0", "cml-hive-assist", "status"],
    });
    expect(versionedNodeWithPathArgv).toEqual(["/usr/bin/node-22.2.0", "cml-hive-assist", "status"]);

    const nodejsArgv = buildParseArgv({
      programName: "cml-hive-assist",
      rawArgs: ["nodejs", "cml-hive-assist", "status"],
    });
    expect(nodejsArgv).toEqual(["nodejs", "cml-hive-assist", "status"]);

    const nonVersionedNodeArgv = buildParseArgv({
      programName: "cml-hive-assist",
      rawArgs: ["node-dev", "cml-hive-assist", "status"],
    });
    expect(nonVersionedNodeArgv).toEqual(["node", "cml-hive-assist", "node-dev", "cml-hive-assist", "status"]);

    const directArgv = buildParseArgv({
      programName: "cml-hive-assist",
      rawArgs: ["cml-hive-assist", "status"],
    });
    expect(directArgv).toEqual(["node", "cml-hive-assist", "status"]);

    const bunArgv = buildParseArgv({
      programName: "cml-hive-assist",
      rawArgs: ["bun", "src/entry.ts", "status"],
    });
    expect(bunArgv).toEqual(["bun", "src/entry.ts", "status"]);
  });

  it("builds parse argv from fallback args", () => {
    const fallbackArgv = buildParseArgv({
      programName: "cml-hive-assist",
      fallbackArgv: ["status"],
    });
    expect(fallbackArgv).toEqual(["node", "cml-hive-assist", "status"]);
  });

  it("decides when to migrate state", () => {
    expect(shouldMigrateState(["node", "cml-hive-assist", "status"])).toBe(false);
    expect(shouldMigrateState(["node", "cml-hive-assist", "health"])).toBe(false);
    expect(shouldMigrateState(["node", "cml-hive-assist", "sessions"])).toBe(false);
    expect(shouldMigrateState(["node", "cml-hive-assist", "memory", "status"])).toBe(false);
    expect(shouldMigrateState(["node", "cml-hive-assist", "agent", "--message", "hi"])).toBe(false);
    expect(shouldMigrateState(["node", "cml-hive-assist", "agents", "list"])).toBe(true);
    expect(shouldMigrateState(["node", "cml-hive-assist", "message", "send"])).toBe(true);
  });

  it("reuses command path for migrate state decisions", () => {
    expect(shouldMigrateStateFromPath(["status"])).toBe(false);
    expect(shouldMigrateStateFromPath(["agents", "list"])).toBe(true);
  });
});
