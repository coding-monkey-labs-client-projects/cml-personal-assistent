import type { AgentToolResult } from "@mariozechner/pi-agent-core";
import type { CmlHiveAssistConfig } from "../../config/config.ts";
import { createActionGate, readStringParam } from "./common.ts";
import { handleDiscordGuildAction } from "./discord-actions-guild.ts";
import { handleDiscordMessagingAction } from "./discord-actions-messaging.ts";
import { handleDiscordModerationAction } from "./discord-actions-moderation.ts";

const messagingActions = new Set([
  "react",
  "reactions",
  "sticker",
  "poll",
  "permissions",
  "fetchMessage",
  "readMessages",
  "sendMessage",
  "editMessage",
  "deleteMessage",
  "threadCreate",
  "threadList",
  "threadReply",
  "pinMessage",
  "unpinMessage",
  "listPins",
  "searchMessages",
]);

const guildActions = new Set([
  "memberInfo",
  "roleInfo",
  "emojiList",
  "emojiUpload",
  "stickerUpload",
  "roleAdd",
  "roleRemove",
  "channelInfo",
  "channelList",
  "voiceStatus",
  "eventList",
  "eventCreate",
  "channelCreate",
  "channelEdit",
  "channelDelete",
  "channelMove",
  "categoryCreate",
  "categoryEdit",
  "categoryDelete",
  "channelPermissionSet",
  "channelPermissionRemove",
]);

const moderationActions = new Set(["timeout", "kick", "ban"]);

export async function handleDiscordAction(
  params: Record<string, unknown>,
  cfg: CmlHiveAssistConfig,
): Promise<AgentToolResult<unknown>> {
  const action = readStringParam(params, "action", { required: true });
  const isActionEnabled = createActionGate(cfg.channels?.discord?.actions);

  if (messagingActions.has(action)) {
    return await handleDiscordMessagingAction(action, params, isActionEnabled);
  }
  if (guildActions.has(action)) {
    return await handleDiscordGuildAction(action, params, isActionEnabled);
  }
  if (moderationActions.has(action)) {
    return await handleDiscordModerationAction(action, params, isActionEnabled);
  }
  throw new Error(`Unknown action: ${action}`);
}
