---
summary: "CLI reference for `cml-hive-assist config` (get/set/unset config values)"
read_when:
  - You want to read or edit config non-interactively
title: "config"
---

# `cml-hive-assist config`

Config helpers: get/set/unset values by path. Run without a subcommand to open
the configure wizard (same as `cml-hive-assist configure`).

## Examples

```bash
cml-hive-assist config get browser.executablePath
cml-hive-assist config set browser.executablePath "/usr/bin/google-chrome"
cml-hive-assist config set agents.defaults.heartbeat.every "2h"
cml-hive-assist config set agents.list[0].tools.exec.node "node-id-or-name"
cml-hive-assist config unset tools.web.search.apiKey
```

## Paths

Paths use dot or bracket notation:

```bash
cml-hive-assist config get agents.defaults.workspace
cml-hive-assist config get agents.list[0].id
```

Use the agent list index to target a specific agent:

```bash
cml-hive-assist config get agents.list
cml-hive-assist config set agents.list[1].tools.exec.node "node-id-or-name"
```

## Values

Values are parsed as JSON5 when possible; otherwise they are treated as strings.
Use `--json` to require JSON5 parsing.

```bash
cml-hive-assist config set agents.defaults.heartbeat.every "0m"
cml-hive-assist config set gateway.port 19001 --json
cml-hive-assist config set channels.whatsapp.groups '["*"]' --json
```

Restart the gateway after edits.
