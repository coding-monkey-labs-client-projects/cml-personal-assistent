import type { CmlHiveAssistConfig } from "../config/config.ts";
import type { WizardPrompter } from "../wizard/prompts.ts";

export async function applyDefaultModelChoice(params: {
  config: CmlHiveAssistConfig;
  setDefaultModel: boolean;
  defaultModel: string;
  applyDefaultConfig: (config: CmlHiveAssistConfig) => CmlHiveAssistConfig;
  applyProviderConfig: (config: CmlHiveAssistConfig) => CmlHiveAssistConfig;
  noteDefault?: string;
  noteAgentModel: (model: string) => Promise<void>;
  prompter: WizardPrompter;
}): Promise<{ config: CmlHiveAssistConfig; agentModelOverride?: string }> {
  if (params.setDefaultModel) {
    const next = params.applyDefaultConfig(params.config);
    if (params.noteDefault) {
      await params.prompter.note(`Default model set to ${params.noteDefault}`, "Model configured");
    }
    return { config: next };
  }

  const next = params.applyProviderConfig(params.config);
  await params.noteAgentModel(params.defaultModel);
  return { config: next, agentModelOverride: params.defaultModel };
}
