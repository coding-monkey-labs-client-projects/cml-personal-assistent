# CML Hive Assist - Gateway Guide

## What is the Gateway?

The Gateway is the **central control plane** for CML Hive Assist. It:
- Manages WebSocket connections
- Routes messages between channels and agents
- Handles session lifecycle
- Serves the Control UI and WebChat
- Orchestrates tool execution

## Starting the Gateway

```bash
# Basic start
cml-hive-assist gateway

# With options
cml-hive-assist gateway --port 18789 --verbose

# Development mode
cml-hive-assist gateway --dev
```

## Configuration

The Gateway reads from `~/.cml-hive-assist/cml-hive-assist.json`:

```json5
{
  "gateway": {
    "port": 18789,
    "bind": "loopback",  // or "0.0.0.0"
    "auth": {
      "mode": "none",    // or "password", "token"
      "allowTailscale": true
    },
    "tailscale": {
      "mode": "off"      // or "serve", "funnel"
    }
  }
}
```

## Key Features

### Sessions Management

Sessions track conversation context:

| Session Type | Use Case |
|--------------|----------|
| `main` | Direct 1:1 chats (owner) |
| `group` | Group conversations |
| `channel` | Channel-specific sessions |

### WebSocket Protocol

The Gateway exposes a WebSocket API at `ws://localhost:18789`:

| Method | Purpose |
|--------|---------|
| `sessions.list` | List active sessions |
| `sessions.get` | Get session details |
| `sessions.patch` | Update session settings |
| `sessions.reset` | Clear session context |
| `node.list` | List connected nodes |
| `node.invoke` | Execute on a node |

### Control UI

Access the web dashboard at `http://localhost:18789`:
- Session monitoring
- Channel status
- Tool management
- WebChat interface

## Remote Access

### Tailscale Integration

```json5
{
  "gateway": {
    "tailscale": {
      "mode": "serve",      // tailnet-only
      // or
      "mode": "funnel",     // public (requires password)
      "resetOnExit": true
    }
  }
}
```

### SSH Tunnels

For remote gateways, use SSH port forwarding:

```bash
ssh -L 18789:localhost:18789 user@remote-host
```

## Security

### Binding

| Mode | Description |
|------|-------------|
| `loopback` | Only localhost (recommended) |
| `0.0.0.0` | All interfaces (use with auth) |

### Authentication

```json5
{
  "gateway": {
    "auth": {
      "mode": "password",
      "password": "your-secret"
    }
  }
}
```

## Health & Monitoring

### Health Check

```bash
cml-hive-assist gateway health
# or
curl http://localhost:18789/health
```

### Logs

```bash
# View logs
cml-hive-assist logs

# Tail logs
cml-hive-assist logs --tail
```

## Daemon Mode

Run Gateway as a background service:

```bash
# Install daemon
cml-hive-assist gateway daemon install

# Start daemon
cml-hive-assist gateway daemon start

# Stop daemon
cml-hive-assist gateway daemon stop

# Check status
cml-hive-assist gateway daemon status
```

### macOS (launchd)

Installs as user service via launchd.

### Linux (systemd)

Installs as systemd user service.

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Port in use | Change port or kill existing process |
| Connection refused | Check if Gateway is running |
| Auth failed | Verify password/token |

### Doctor Command

```bash
cml-hive-assist doctor
```

Checks:
- Gateway connectivity
- Channel status
- Configuration issues
- Security warnings
