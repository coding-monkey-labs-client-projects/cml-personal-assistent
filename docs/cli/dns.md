---
summary: "CLI reference for `cml-hive-assist dns` (wide-area discovery helpers)"
read_when:
  - You want wide-area discovery (DNS-SD) via Tailscale + CoreDNS
  - You’re setting up split DNS for a custom discovery domain (example: cml-hive-assist.internal)
title: "dns"
---

# `cml-hive-assist dns`

DNS helpers for wide-area discovery (Tailscale + CoreDNS). Currently focused on macOS + Homebrew CoreDNS.

Related:

- Gateway discovery: [Discovery](/gateway/discovery)
- Wide-area discovery config: [Configuration](/gateway/configuration)

## Setup

```bash
cml-hive-assist dns setup
cml-hive-assist dns setup --apply
```
