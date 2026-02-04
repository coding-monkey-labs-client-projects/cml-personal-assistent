/**
 * CML Hive Assist UI - Local Storage Utilities
 */

import type { ThemeMode } from "./types.ts";

const STORAGE_KEY = "cml-hive-assist-ui-settings";

export interface UiSettings {
  gatewayUrl?: string;
  theme?: ThemeMode;
  sessionKey?: string;
  lastActiveSessionKey?: string;
  splitRatio?: number;
}

export function loadSettings(): UiSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as UiSettings;
    }
  } catch {
    // Ignore parsing errors
  }
  return {};
}

export function saveSettings(settings: UiSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Ignore storage errors
  }
}

export function clearSettings(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
}
