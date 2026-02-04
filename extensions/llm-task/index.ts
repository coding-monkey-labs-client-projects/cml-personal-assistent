import type { CmlHiveAssistPluginApi } from "../../src/plugins/types.js";
import { createLlmTaskTool } from "./src/llm-task-tool.js";

export default function register(api: CmlHiveAssistPluginApi) {
  api.registerTool(createLlmTaskTool(api), { optional: true });
}
