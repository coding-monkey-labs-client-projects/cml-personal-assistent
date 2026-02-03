---
summary: "CLI reference for `cml-hive-assist health` (gateway health endpoint via RPC)"
read_when:
  - You want to quickly check the running Gateway’s health
title: "health"
---

# `cml-hive-assist health`

Fetch health from the running Gateway.

```bash
cml-hive-assist health
cml-hive-assist health --json
cml-hive-assist health --verbose
```

Notes:

- `--verbose` runs live probes and prints per-account timings when multiple accounts are configured.
- Output includes per-agent session stores when multiple agents are configured.
