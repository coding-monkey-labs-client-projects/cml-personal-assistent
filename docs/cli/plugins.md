---
summary: "CLI reference for `cml-hive-assist plugins` (list, install, enable/disable, doctor)"
read_when:
  - You want to install or manage in-process Gateway plugins
  - You want to debug plugin load failures
title: "plugins"
---

# `cml-hive-assist plugins`

Manage Gateway plugins/extensions (loaded in-process).

Related:

- Plugin system: [Plugins](/plugin)
- Plugin manifest + schema: [Plugin manifest](/plugins/manifest)
- Security hardening: [Security](/gateway/security)

## Commands

```bash
cml-hive-assist plugins list
cml-hive-assist plugins info <id>
cml-hive-assist plugins enable <id>
cml-hive-assist plugins disable <id>
cml-hive-assist plugins doctor
cml-hive-assist plugins update <id>
cml-hive-assist plugins update --all
```

Bundled plugins ship with CmlHiveAssist but start disabled. Use `plugins enable` to
activate them.

All plugins must ship a `cml-hive-assist.plugin.json` file with an inline JSON Schema
(`configSchema`, even if empty). Missing/invalid manifests or schemas prevent
the plugin from loading and fail config validation.

### Install

```bash
cml-hive-assist plugins install <path-or-spec>
```

Security note: treat plugin installs like running code. Prefer pinned versions.

Supported archives: `.zip`, `.tgz`, `.tar.gz`, `.tar`.

Use `--link` to avoid copying a local directory (adds to `plugins.load.paths`):

```bash
cml-hive-assist plugins install -l ./my-plugin
```

### Update

```bash
cml-hive-assist plugins update <id>
cml-hive-assist plugins update --all
cml-hive-assist plugins update <id> --dry-run
```

Updates only apply to plugins installed from npm (tracked in `plugins.installs`).
