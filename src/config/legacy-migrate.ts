import type { CmlHiveAssistConfig } from "./types.ts";
import { applyLegacyMigrations } from "./legacy.ts";
import { validateConfigObjectWithPlugins } from "./validation.ts";

export function migrateLegacyConfig(raw: unknown): {
  config: CmlHiveAssistConfig | null;
  changes: string[];
} {
  const { next, changes } = applyLegacyMigrations(raw);
  if (!next) {
    return { config: null, changes: [] };
  }
  const validated = validateConfigObjectWithPlugins(next);
  if (!validated.ok) {
    changes.push("Migration applied, but config still invalid; fix remaining issues manually.");
    return { config: null, changes };
  }
  return { config: validated.config, changes };
}
