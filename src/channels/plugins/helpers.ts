import type { CmlHiveAssistConfig } from "../../config/config.ts";
import type { ChannelPlugin } from "./types.ts";
import { formatCliCommand } from "../../cli/command-format.ts";
import { DEFAULT_ACCOUNT_ID } from "../../routing/session-key.ts";

// Channel docking helper: use this when selecting the default account for a plugin.
export function resolveChannelDefaultAccountId<ResolvedAccount>(params: {
  plugin: ChannelPlugin<ResolvedAccount>;
  cfg: CmlHiveAssistConfig;
  accountIds?: string[];
}): string {
  const accountIds = params.accountIds ?? params.plugin.config.listAccountIds(params.cfg);
  return params.plugin.config.defaultAccountId?.(params.cfg) ?? accountIds[0] ?? DEFAULT_ACCOUNT_ID;
}

export function formatPairingApproveHint(channelId: string): string {
  const listCmd = formatCliCommand(`cml-hive-assist pairing list ${channelId}`);
  const approveCmd = formatCliCommand(`cml-hive-assist pairing approve ${channelId} <code>`);
  return `Approve via: ${listCmd} / ${approveCmd}`;
}
