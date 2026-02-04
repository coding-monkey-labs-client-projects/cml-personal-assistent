import type { CmlHiveAssistConfig } from "../config/config.ts";
import type { PluginInstallRecord } from "../config/types.plugins.ts";

export type PluginInstallUpdate = PluginInstallRecord & { pluginId: string };

export function recordPluginInstall(
  cfg: CmlHiveAssistConfig,
  update: PluginInstallUpdate,
): CmlHiveAssistConfig {
  const { pluginId, ...record } = update;
  const installs = {
    ...cfg.plugins?.installs,
    [pluginId]: {
      ...cfg.plugins?.installs?.[pluginId],
      ...record,
      installedAt: record.installedAt ?? new Date().toISOString(),
    },
  };

  return {
    ...cfg,
    plugins: {
      ...cfg.plugins,
      installs: {
        ...installs,
        [pluginId]: installs[pluginId],
      },
    },
  };
}
