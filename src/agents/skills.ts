import type { CmlHiveAssistConfig } from "../config/config.ts";
import type { SkillsInstallPreferences } from "./skills/types.ts";

export {
  hasBinary,
  isBundledSkillAllowed,
  isConfigPathTruthy,
  resolveBundledAllowlist,
  resolveConfigPath,
  resolveRuntimePlatform,
  resolveSkillConfig,
} from "./skills/config.ts";
export {
  applySkillEnvOverrides,
  applySkillEnvOverridesFromSnapshot,
} from "./skills/env-overrides.ts";
export type {
  CmlHiveAssistSkillMetadata,
  SkillEligibilityContext,
  SkillCommandSpec,
  SkillEntry,
  SkillInstallSpec,
  SkillSnapshot,
  SkillsInstallPreferences,
} from "./skills/types.ts";
export {
  buildWorkspaceSkillSnapshot,
  buildWorkspaceSkillsPrompt,
  buildWorkspaceSkillCommandSpecs,
  filterWorkspaceSkillEntries,
  loadWorkspaceSkillEntries,
  resolveSkillsPromptForRun,
  syncSkillsToWorkspace,
} from "./skills/workspace.ts";

export function resolveSkillsInstallPreferences(config?: CmlHiveAssistConfig): SkillsInstallPreferences {
  const raw = config?.skills?.install;
  const preferBrew = raw?.preferBrew ?? true;
  const managerRaw = typeof raw?.nodeManager === "string" ? raw.nodeManager.trim() : "";
  const manager = managerRaw.toLowerCase();
  const nodeManager: SkillsInstallPreferences["nodeManager"] =
    manager === "pnpm" || manager === "yarn" || manager === "bun" || manager === "npm"
      ? manager
      : "npm";
  return { preferBrew, nodeManager };
}
