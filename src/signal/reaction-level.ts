// Stub file - Signal channel removed

import type { CmlHiveAssistConfig } from "../config/config.ts";

export function resolveSignalReactionLevel(_params?: {
  cfg?: CmlHiveAssistConfig;
  accountId?: string;
}): { level: string; agentReactionsEnabled: boolean } {
  return { level: "none", agentReactionsEnabled: false };
}
