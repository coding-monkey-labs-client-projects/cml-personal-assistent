---
summary: "CLI reference for `cml-hive-assist logs` (tail gateway logs via RPC)"
read_when:
  - You need to tail Gateway logs remotely (without SSH)
  - You want JSON log lines for tooling
title: "logs"
---

# `cml-hive-assist logs`

Tail Gateway file logs over RPC (works in remote mode).

Related:

- Logging overview: [Logging](/logging)

## Examples

```bash
cml-hive-assist logs
cml-hive-assist logs --follow
cml-hive-assist logs --json
cml-hive-assist logs --limit 500
```
