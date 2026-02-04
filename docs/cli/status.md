---
summary: "CLI reference for `cml-hive-assist status` (diagnostics, probes, usage snapshots)"
read_when:
  - You want a quick diagnosis of channel health + recent session recipients
  - You want a pasteable “all” status for debugging
title: "status"
---

# `cml-hive-assist status`

Diagnostics for channels + sessions.

```bash
cml-hive-assist status
cml-hive-assist status --all
cml-hive-assist status --deep
cml-hive-assist status --usage
```

Notes:

- `--deep` runs live probes (WhatsApp Web + Telegram + Discord + Google Chat + Slack + Signal).
- Output includes per-agent session stores when multiple agents are configured.
- Overview includes Gateway + node host service install/runtime status when available.
- Overview includes update channel + git SHA (for source checkouts).
- Update info surfaces in the Overview; if an update is available, status prints a hint to run `cml-hive-assist update` (see [Updating](/install/updating)).
