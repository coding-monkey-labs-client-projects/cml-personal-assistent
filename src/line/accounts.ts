// Stub file - LINE channel removed

import type { CmlHiveAssistConfig } from "../config/config.ts";
import type { ResolvedLineAccount, LineChannelData } from "./types.ts";

export function listLineAccountIds(_cfg: CmlHiveAssistConfig): string[] {
  return [];
}

export function resolveDefaultLineAccountId(_cfg: CmlHiveAssistConfig): string {
  return "default";
}

export function resolveLineAccount(_params: {
  cfg: CmlHiveAssistConfig;
  accountId?: string | null;
}): ResolvedLineAccount {
  return {
    accountId: "default",
    config: {},
  };
}

export function normalizeAccountId(accountId?: string | null): string {
  return accountId?.trim().toLowerCase() ?? "default";
}
