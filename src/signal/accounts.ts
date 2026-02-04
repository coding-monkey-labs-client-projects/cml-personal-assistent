// Stub file - Signal channel removed

import type { CmlHiveAssistConfig } from "../config/config.ts";

export type ResolvedSignalAccount = {
  accountId: string;
  configured: boolean;
  config: {
    allowFrom?: Array<string | number>;
    actions?: Record<string, boolean>;
  };
};

export function listSignalAccountIds(_cfg: CmlHiveAssistConfig): string[] {
  return [];
}

export function listEnabledSignalAccounts(_cfg: CmlHiveAssistConfig): ResolvedSignalAccount[] {
  return [];
}

export function resolveDefaultSignalAccountId(_cfg: CmlHiveAssistConfig): string {
  return "default";
}

export function resolveSignalAccount(_params: {
  cfg: CmlHiveAssistConfig;
  accountId?: string | null;
}): ResolvedSignalAccount {
  return {
    accountId: "default",
    configured: false,
    config: {},
  };
}
