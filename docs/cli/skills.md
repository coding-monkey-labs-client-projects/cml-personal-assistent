---
summary: "CLI reference for `cml-hive-assist skills` (list/info/check) and skill eligibility"
read_when:
  - You want to see which skills are available and ready to run
  - You want to debug missing binaries/env/config for skills
title: "skills"
---

# `cml-hive-assist skills`

Inspect skills (bundled + workspace + managed overrides) and see what’s eligible vs missing requirements.

Related:

- Skills system: [Skills](/tools/skills)
- Skills config: [Skills config](/tools/skills-config)
- ClawHub installs: [ClawHub](/tools/clawhub)

## Commands

```bash
cml-hive-assist skills list
cml-hive-assist skills list --eligible
cml-hive-assist skills info <name>
cml-hive-assist skills check
```
