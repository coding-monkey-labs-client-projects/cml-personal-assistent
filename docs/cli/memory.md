---
summary: "CLI reference for `cml-hive-assist memory` (status/index/search)"
read_when:
  - You want to index or search semantic memory
  - You’re debugging memory availability or indexing
title: "memory"
---

# `cml-hive-assist memory`

Manage semantic memory indexing and search.
Provided by the active memory plugin (default: `memory-core`; set `plugins.slots.memory = "none"` to disable).

Related:

- Memory concept: [Memory](/concepts/memory)
- Plugins: [Plugins](/plugins)

## Examples

```bash
cml-hive-assist memory status
cml-hive-assist memory status --deep
cml-hive-assist memory status --deep --index
cml-hive-assist memory status --deep --index --verbose
cml-hive-assist memory index
cml-hive-assist memory index --verbose
cml-hive-assist memory search "release checklist"
cml-hive-assist memory status --agent main
cml-hive-assist memory index --agent main --verbose
```

## Options

Common:

- `--agent <id>`: scope to a single agent (default: all configured agents).
- `--verbose`: emit detailed logs during probes and indexing.

Notes:

- `memory status --deep` probes vector + embedding availability.
- `memory status --deep --index` runs a reindex if the store is dirty.
- `memory index --verbose` prints per-phase details (provider, model, sources, batch activity).
- `memory status` includes any extra paths configured via `memorySearch.extraPaths`.
