---
summary: "CLI reference for `cml-hive-assist reset` (reset local state/config)"
read_when:
  - You want to wipe local state while keeping the CLI installed
  - You want a dry-run of what would be removed
title: "reset"
---

# `cml-hive-assist reset`

Reset local config/state (keeps the CLI installed).

```bash
cml-hive-assist reset
cml-hive-assist reset --dry-run
cml-hive-assist reset --scope config+creds+sessions --yes --non-interactive
```
