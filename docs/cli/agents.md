---
summary: "CLI reference for `cml-hive-assist agents` (list/add/delete/set identity)"
read_when:
  - You want multiple isolated agents (workspaces + routing + auth)
title: "agents"
---

# `cml-hive-assist agents`

Manage isolated agents (workspaces + auth + routing).

Related:

- Multi-agent routing: [Multi-Agent Routing](/concepts/multi-agent)
- Agent workspace: [Agent workspace](/concepts/agent-workspace)

## Examples

```bash
cml-hive-assist agents list
cml-hive-assist agents add work --workspace ~/.cml-hive-assist/workspace-work
cml-hive-assist agents set-identity --workspace ~/.cml-hive-assist/workspace --from-identity
cml-hive-assist agents set-identity --agent main --avatar avatars/cml-hive-assist.png
cml-hive-assist agents delete work
```

## Identity files

Each agent workspace can include an `IDENTITY.md` at the workspace root:

- Example path: `~/.cml-hive-assist/workspace/IDENTITY.md`
- `set-identity --from-identity` reads from the workspace root (or an explicit `--identity-file`)

Avatar paths resolve relative to the workspace root.

## Set identity

`set-identity` writes fields into `agents.list[].identity`:

- `name`
- `theme`
- `emoji`
- `avatar` (workspace-relative path, http(s) URL, or data URI)

Load from `IDENTITY.md`:

```bash
cml-hive-assist agents set-identity --workspace ~/.cml-hive-assist/workspace --from-identity
```

Override fields explicitly:

```bash
cml-hive-assist agents set-identity --agent main --name "CmlHiveAssist" --emoji "🦞" --avatar avatars/cml-hive-assist.png
```

Config sample:

```json5
{
  agents: {
    list: [
      {
        id: "main",
        identity: {
          name: "CmlHiveAssist",
          theme: "space lobster",
          emoji: "🦞",
          avatar: "avatars/cml-hive-assist.png",
        },
      },
    ],
  },
}
```
