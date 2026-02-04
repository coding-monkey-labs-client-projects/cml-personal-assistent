import type { CmlHiveAssistConfig } from "../config/config.ts";
import type { RuntimeEnv } from "../runtime.ts";
import { formatCliCommand } from "../cli/command-format.ts";
import { readConfigFileSnapshot } from "../config/config.ts";

export function createQuietRuntime(runtime: RuntimeEnv): RuntimeEnv {
  return { ...runtime, log: () => {} };
}

export async function requireValidConfig(runtime: RuntimeEnv): Promise<CmlHiveAssistConfig | null> {
  const snapshot = await readConfigFileSnapshot();
  if (snapshot.exists && !snapshot.valid) {
    const issues =
      snapshot.issues.length > 0
        ? snapshot.issues.map((issue) => `- ${issue.path}: ${issue.message}`).join("\n")
        : "Unknown validation issue.";
    runtime.error(`Config invalid:\n${issues}`);
    runtime.error(`Fix the config or run ${formatCliCommand("cml-hive-assist doctor")}.`);
    runtime.exit(1);
    return null;
  }
  return snapshot.config;
}
