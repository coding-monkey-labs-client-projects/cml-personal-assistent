---
summary: "CLI reference for `cml-hive-assist cron` (schedule and run background jobs)"
read_when:
  - You want scheduled jobs and wakeups
  - You’re debugging cron execution and logs
title: "cron"
---

# `cml-hive-assist cron`

Manage cron jobs for the Gateway scheduler.

Related:

- Cron jobs: [Cron jobs](/automation/cron-jobs)

Tip: run `cml-hive-assist cron --help` for the full command surface.

## Common edits

Update delivery settings without changing the message:

```bash
cml-hive-assist cron edit <job-id> --deliver --channel telegram --to "123456789"
```

Disable delivery for an isolated job:

```bash
cml-hive-assist cron edit <job-id> --no-deliver
```
