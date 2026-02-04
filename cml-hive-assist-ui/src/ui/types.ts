/**
 * CML Hive Assist UI - Type Definitions
 */

// Navigation tabs
export type Tab =
  | "chat"
  | "channels"
  | "agents"
  | "config"
  | "logs"
  | "overview"
  | "cron"
  | "skills"
  | "debug";

// Theme mode
export type ThemeMode = "light" | "dark" | "system";

// Channel types - only enterprise + core channels
export type ChannelId = "whatsapp" | "telegram" | "slack" | "msteams";

// Connection status
export type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";

// Gateway hello response
export interface GatewayHelloOk {
  version: string;
  channels?: string[];
  features?: string[];
}

// Channel status
export interface ChannelStatus {
  id: ChannelId;
  name: string;
  configured: boolean;
  connected: boolean;
  error?: string;
}

// Log entry
export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
}

export type LogLevel = "debug" | "info" | "warn" | "error";

// Chat message
export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  pending?: boolean;
}

// Agent info
export interface AgentInfo {
  id: string;
  name: string;
  status: "active" | "inactive" | "error";
  lastActivity?: string;
}

// Config snapshot
export interface ConfigSnapshot {
  raw: string;
  parsed: Record<string, unknown>;
  valid: boolean;
  issues?: string[];
}
