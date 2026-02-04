# Security Configuration Guide

This document provides comprehensive guidance for configuring CML Hive Assist with security as a priority.

## Configuration File Location

Main configuration: `~/.cml-hive-assist/cml-hive-assist.json`

Format: JSON5 (supports comments and trailing commas)

## Gateway Security

### Binding Configuration

The gateway should only be accessible from trusted networks.

```json5
{
  gateway: {
    // Bind to loopback only - most secure
    bind: "loopback",
    port: 18789,

    // Authentication required for non-loopback binds
    auth: {
      mode: "password",
      password: "${CML_HIVE_ASSIST_GATEWAY_PASSWORD}",
    },
  },
}
```

**Binding Options:**

- `loopback` - Only accessible from localhost (recommended)
- `tailscale` - Accessible via Tailscale network only
- `0.0.0.0` - All interfaces (requires authentication)

### Authentication Modes

| Mode        | Description         | Use Case               |
| ----------- | ------------------- | ---------------------- |
| `none`      | No authentication   | Local development only |
| `password`  | Password-based auth | Remote access          |
| `token`     | Token-based auth    | API access             |
| `tailscale` | Tailscale identity  | VPN-based access       |

## Channel Security

### DM Policy Configuration

All channels support DM (Direct Message) policies to control who can interact with the agent.

```json5
{
  channels: {
    whatsapp: {
      dmPolicy: "pairing", // Require pairing before accepting DMs
      allowFrom: [], // Explicit allowlist (empty = pairing only)
    },
    telegram: {
      dmPolicy: "pairing",
      allowFrom: [],
    },
    discord: {
      dm: {
        policy: "pairing",
        allowFrom: [],
      },
    },
    slack: {
      dm: {
        policy: "pairing",
        allowFrom: [],
      },
    },
    signal: {
      dmPolicy: "pairing",
      allowFrom: [],
    },
  },
}
```

**DM Policy Options:**

- `pairing` - Require device pairing before accepting DMs (recommended)
- `allowlist` - Only accept DMs from allowed senders
- `open` - Accept DMs from anyone (requires explicit `allowFrom: ["*"]`)

### Allowlist Format

```json5
{
  channels: {
    telegram: {
      allowFrom: [
        "123456789", // User ID
        "@username", // Username
        "group:987654321", // Group ID
      ],
    },
  },
}
```

## Sandbox Configuration

Sandboxing isolates agent execution in Docker containers, protecting the host system.

```json5
{
  agents: {
    defaults: {
      sandbox: {
        // Sandbox mode
        mode: "always", // "off" | "non-main" | "always"

        // Workspace access inside sandbox
        workspaceAccess: "rw", // "none" | "ro" | "rw"

        // Scope of sandbox isolation
        scope: "session", // "session" | "agent" | "shared"

        // Docker-specific settings
        docker: {
          image: "cml-hive-assist/sandbox:latest",
          readOnlyRoot: true,
          network: "none",
          capDrop: ["ALL"],
          pidsLimit: 100,
          memory: "512m",
          cpus: 0.5,
        },
      },
    },
  },
}
```

### Sandbox Modes

| Mode       | Description                                         |
| ---------- | --------------------------------------------------- |
| `off`      | No sandboxing (not recommended for production)      |
| `non-main` | Sandbox non-main sessions only (reasonable default) |
| `always`   | Sandbox all sessions (most secure)                  |

## Path Access Controls

Control which paths the agent can access.

```json5
{
  agents: {
    defaults: {
      sandbox: {
        allowPaths: ["~/.cml-hive-assist/workspace", "/tmp/cml-hive-assist"],
        denyPaths: ["~/.ssh", "~/.aws", "~/.config", "~/.gnupg", "/etc", "/usr", "/bin", "/sbin"],
      },
    },
  },
}
```

### Path Expansion

- `~` expands to the user's home directory
- Paths are normalized and compared after expansion
- Deny paths take precedence over allow paths

## Tool Restrictions

Control which tools the agent can use and which commands can be executed.

```json5
{
  tools: {
    // Tool profiles: "minimal" | "coding" | "messaging" | "full"
    profile: "coding",

    // Additional allowed tools
    alsoAllow: ["github", "notion"],

    // Denied tools
    deny: ["browser"],

    // Bash tool configuration
    bash: {
      enabled: true,
      sandbox: true,

      // Denied command patterns (regex)
      deniedPatterns: [
        "rm -rf /",
        "rm -rf ~",
        "curl.*\\|.*bash",
        "wget.*\\|.*bash",
        "sudo",
        "> /etc",
        "> /usr",
        "chmod 777",
      ],
    },

    // Browser tool - disabled by default for security
    browser: {
      enabled: false,
    },

    // Exec tool configuration
    exec: {
      host: "sandbox",
      security: "allowlist",
      ask: "on-miss",
    },
  },
}
```

### Tool Profiles

| Profile     | Included Tools                   |
| ----------- | -------------------------------- |
| `minimal`   | Basic read/write operations only |
| `coding`    | Code editing, git, basic shell   |
| `messaging` | Channel messaging tools          |
| `full`      | All available tools              |

## Audit Logging

Enable comprehensive logging for security monitoring.

```json5
{
  logging: {
    level: "info",

    // Audit logging options
    auditTools: true, // Log all tool invocations
    auditFileOps: true, // Log all file operations
    auditMessages: true, // Log message handling

    // Log rotation
    maxFiles: 10,
    maxSize: "10m",
  },
}
```

## Rate Limiting

Protect against abuse with rate limiting.

```json5
{
  gateway: {
    rateLimit: {
      enabled: true,
      maxRequests: 100,
      windowMs: 60000, // 1 minute
      delayMs: 500, // Delay between requests
    },
  },
}
```

## Environment Variables

Store sensitive values in environment variables, not configuration files.

```bash
# Gateway authentication
export CML_HIVE_ASSIST_GATEWAY_PASSWORD="your-secure-password"

# API keys
export ANTHROPIC_API_KEY="sk-..."
export OPENAI_API_KEY="sk-..."

# Channel tokens
export TELEGRAM_BOT_TOKEN="..."
export DISCORD_BOT_TOKEN="..."
export SLACK_BOT_TOKEN="..."
```

Reference in configuration:

```json5
{
  gateway: {
    auth: {
      password: "${CML_HIVE_ASSIST_GATEWAY_PASSWORD}",
    },
  },
}
```

## Secure Configuration Template

See `../workspace-templates/secure-config.json5` for a complete secure configuration example.

## Security Validation

Run the security audit to check your configuration:

```bash
# Basic audit
cml-hive-assist security audit

# Deep audit with recommendations
cml-hive-assist security audit --deep

# Show what would be fixed
cml-hive-assist security audit --fix --dry-run

# Apply fixes
cml-hive-assist security audit --fix
```

## Common Security Issues

### Issue: DM Policy Set to "open"

**Risk**: Anyone can send messages to your agent.

**Fix**: Change to `pairing` and add explicit allowlist.

### Issue: Gateway Bound to All Interfaces

**Risk**: Gateway accessible from any network.

**Fix**: Bind to `loopback` or enable authentication.

### Issue: Sandbox Mode Disabled

**Risk**: Agent commands run on host system.

**Fix**: Enable sandbox mode (`non-main` or `always`).

### Issue: Sensitive Paths Accessible

**Risk**: Agent can access SSH keys, credentials, etc.

**Fix**: Add sensitive directories to `denyPaths`.

### Issue: Dangerous Commands Not Blocked

**Risk**: Agent could execute destructive commands.

**Fix**: Configure `deniedPatterns` in tools.bash.
