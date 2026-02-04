---
summary: "Gateway web surfaces: Control UI, bind modes, and security"
read_when:
  - You want to access the Gateway over Tailscale
  - You want the browser Control UI and config editing
title: "Web"
---

# Web (Gateway)

The Gateway serves a **browser Control UI** (Vite + Lit) from the same port as the Gateway WebSocket:

- default: `http://<host>:18789/`
- optional prefix: set `gateway.controlUi.basePath` (e.g. `/cml-hive-assist`)

There are two Control UI versions:

| UI Version            | Source                | Output                     | Description                                                                        |
| --------------------- | --------------------- | -------------------------- | ---------------------------------------------------------------------------------- |
| Control UI (original) | `ui/`                 | `dist/control-ui/`         | Full-featured control panel with chat, channels, config, nodes, cron, skills, logs |
| Control UI V2         | `cml-hive-assist-ui/` | `dist/cml-hive-assist-ui/` | Redesigned interface with modern styling (Chat, Channels, Agents, Config, Logs)    |

The Gateway serves from `dist/control-ui/` by default. To use UI V2, configure `gateway.controlUi.assetPath`.

Capabilities live in [Control UI](/web/control-ui).
This page focuses on bind modes, security, and web-facing surfaces.

## Webhooks

When `hooks.enabled=true`, the Gateway also exposes a small webhook endpoint on the same HTTP server.
See [Gateway configuration](/gateway/configuration) → `hooks` for auth + payloads.

## Config (default-on)

The Control UI is **enabled by default** when assets are present (`dist/control-ui`).
You can control it via config:

```json5
{
  gateway: {
    controlUi: { enabled: true, basePath: "/cml-hive-assist" }, // basePath optional
  },
}
```

## Tailscale access

### Integrated Serve (recommended)

Keep the Gateway on loopback and let Tailscale Serve proxy it:

```json5
{
  gateway: {
    bind: "loopback",
    tailscale: { mode: "serve" },
  },
}
```

Then start the gateway:

```bash
cml-hive-assist gateway
```

Open:

- `https://<magicdns>/` (or your configured `gateway.controlUi.basePath`)

### Tailnet bind + token

```json5
{
  gateway: {
    bind: "tailnet",
    controlUi: { enabled: true },
    auth: { mode: "token", token: "your-token" },
  },
}
```

Then start the gateway (token required for non-loopback binds):

```bash
cml-hive-assist gateway
```

Open:

- `http://<tailscale-ip>:18789/` (or your configured `gateway.controlUi.basePath`)

### Public internet (Funnel)

```json5
{
  gateway: {
    bind: "loopback",
    tailscale: { mode: "funnel" },
    auth: { mode: "password" }, // or CML_HIVE_ASSIST_GATEWAY_PASSWORD
  },
}
```

## Security notes

- Gateway auth is required by default (token/password or Tailscale identity headers).
- Non-loopback binds still **require** a shared token/password (`gateway.auth` or env).
- The wizard generates a gateway token by default (even on loopback).
- The UI sends `connect.params.auth.token` or `connect.params.auth.password`.
- With Serve, Tailscale identity headers can satisfy auth when
  `gateway.auth.allowTailscale` is `true` (no token/password required). Set
  `gateway.auth.allowTailscale: false` to require explicit credentials. See
  [Tailscale](/gateway/tailscale) and [Security](/gateway/security).
- `gateway.tailscale.mode: "funnel"` requires `gateway.auth.mode: "password"` (shared password).

## Building the UI

The Gateway serves static files from `dist/control-ui` (original) or `dist/cml-hive-assist-ui` (V2).

```bash
# Build original Control UI
pnpm ui:build

# Build Control UI V2
pnpm ui2:build

# Build both
pnpm ui:build && pnpm ui2:build
```

To switch to UI V2, set the asset path in config:

```json5
{
  gateway: {
    controlUi: {
      enabled: true,
      assetPath: "dist/cml-hive-assist-ui",
    },
  },
}
```
