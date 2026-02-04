# CML Hive Assist - Configuration Guide

## Configuration File

Main config: `~/.cml-hive-assist/cml-hive-assist.json`

Format: JSON5 (JSON with comments and trailing commas)

## Minimal Configuration

```json5
{
  agent: {
    model: "anthropic/claude-opus-4-5",
  },
}
```

## Full Configuration Structure

```json5
{
  // Agent settings
  agent: {
    model: "anthropic/claude-opus-4-5",
    thinking: "high", // off|minimal|low|medium|high|xhigh
    verbose: false,
  },

  // Gateway settings
  gateway: {
    port: 18789,
    bind: "loopback",
    auth: {
      mode: "none",
    },
  },

  // Channel configurations
  channels: {
    whatsapp: {
      /* ... */
    },
    telegram: {
      /* ... */
    },
    discord: {
      /* ... */
    },
    slack: {
      /* ... */
    },
    signal: {
      /* ... */
    },
    imessage: {
      /* ... */
    },
    googlechat: {
      /* ... */
    },
  },

  // Agent workspace
  agents: {
    defaults: {
      workspace: "~/.cml-hive-assist/workspace",
      sandbox: {
        mode: "non-main",
      },
    },
  },

  // Browser settings
  browser: {
    enabled: true,
    color: "#FF4500",
  },

  // Skills configuration
  skills: {
    enabled: ["github", "notion"],
    disabled: [],
  },
}
```

## Configuration Sections

### Agent

```json5
{
  agent: {
    model: "anthropic/claude-opus-4-5",
    thinking: "high",
    verbose: false,
    maxTokens: 4096,
  },
}
```

### Gateway

```json5
{
  gateway: {
    port: 18789,
    bind: "loopback",
    auth: {
      mode: "password",
      password: "secret",
    },
    tailscale: {
      mode: "serve",
    },
  },
}
```

### Channels

Each channel has its own configuration section. See [channels-guide.md](channels-guide.md) for details.

### Security & Sandbox

```json5
{
  agents: {
    defaults: {
      sandbox: {
        mode: "non-main", // Sandbox non-main sessions
        allowTools: ["bash", "read", "write", "edit"],
        denyTools: ["browser", "canvas"],
      },
    },
  },
}
```

### Skills

```json5
{
  skills: {
    // Enable specific skills
    enabled: ["github", "notion", "slack"],
    // Disable specific skills
    disabled: ["voice-call"],
    // Custom skill paths
    paths: ["~/my-skills"],
  },
}
```

## Environment Variables

Environment variables override config file settings:

| Variable                  | Purpose             |
| ------------------------- | ------------------- |
| `CML_HIVE_ASSIST_PROFILE` | Config profile name |
| `TELEGRAM_BOT_TOKEN`      | Telegram bot token  |
| `SLACK_BOT_TOKEN`         | Slack bot token     |
| `SLACK_APP_TOKEN`         | Slack app token     |
| `DISCORD_BOT_TOKEN`       | Discord bot token   |
| `ANTHROPIC_API_KEY`       | Anthropic API key   |
| `OPENAI_API_KEY`          | OpenAI API key      |

## Workspace Structure

Default workspace: `~/.cml-hive-assist/workspace`

```
workspace/
├── AGENTS.md      # Agent behavior instructions
├── SOUL.md        # Personality definition
├── TOOLS.md       # Tool customization
└── skills/        # Workspace-level skills
    └── my-skill/
        └── SKILL.md
```

## Configuration Precedence

1. Environment variables (highest)
2. Config file (`~/.cml-hive-assist/cml-hive-assist.json`)
3. Default values (lowest)

## Validation

```bash
# Check configuration
cml-hive-assist doctor

# Show current config
cml-hive-assist config show
```
