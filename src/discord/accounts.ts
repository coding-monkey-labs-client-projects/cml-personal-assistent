// Stub file - Discord channel removed
// This file provides type-compatible stubs for code that references Discord

import type { CmlHiveAssistConfig } from "../config/config.ts";

export type ResolvedDiscordAccount = {
  accountId: string;
  tokenSource: string;
  config: {
    token?: string;
    dm?: { allowFrom?: Array<string | number> };
  };
};

export function listDiscordAccountIds(_cfg: CmlHiveAssistConfig): string[] {
  return [];
}

export function listEnabledDiscordAccounts(_cfg: CmlHiveAssistConfig): ResolvedDiscordAccount[] {
  return [];
}

export function resolveDefaultDiscordAccountId(_cfg: CmlHiveAssistConfig): string {
  return "default";
}

export function resolveDiscordAccount(_params: {
  cfg: CmlHiveAssistConfig;
  accountId?: string | null;
}): ResolvedDiscordAccount {
  return {
    accountId: "default",
    tokenSource: "none",
    config: {},
  };
}
