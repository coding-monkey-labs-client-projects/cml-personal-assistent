# CML Hive Assist - Channels Guide

## Supported Channels

CML Hive Assist supports multiple messaging channels, each with its own integration method.

## Primary Channels

### WhatsApp
- **Integration**: Baileys web library (no official API needed)
- **Config Key**: `channels.whatsapp`
- **Setup**: `cml-hive-assist channels login` to scan QR code
- **Features**: DM, Groups, Media

```json5
{
  "channels": {
    "whatsapp": {
      "allowFrom": ["+1234567890"],
      "groups": ["*"]  // or specific group IDs
    }
  }
}
```

### Telegram
- **Integration**: grammY framework
- **Config Key**: `channels.telegram`
- **Setup**: Set `TELEGRAM_BOT_TOKEN` or config
- **Features**: DM, Groups, Webhooks

```json5
{
  "channels": {
    "telegram": {
      "botToken": "123456:ABCDEF",
      "groups": {
        "*": { "requireMention": true }
      }
    }
  }
}
```

### Slack
- **Integration**: Bolt framework
- **Config Key**: `channels.slack`
- **Setup**: Set `SLACK_BOT_TOKEN` + `SLACK_APP_TOKEN`
- **Features**: DM, Channels, Threads

### Discord
- **Integration**: discord.js
- **Config Key**: `channels.discord`
- **Setup**: Set `DISCORD_BOT_TOKEN`
- **Features**: DM, Guilds, Slash commands

```json5
{
  "channels": {
    "discord": {
      "token": "your-bot-token",
      "dm": {
        "policy": "pairing",
        "allowFrom": []
      }
    }
  }
}
```

### Signal
- **Integration**: signal-cli
- **Config Key**: `channels.signal`
- **Setup**: Install signal-cli, configure account
- **Features**: DM, Groups

### iMessage (macOS only)
- **Integration**: imsg native bridge
- **Config Key**: `channels.imessage`
- **Setup**: Messages app must be signed in
- **Features**: DM, Groups

### Google Chat
- **Integration**: Chat API
- **Config Key**: `channels.googlechat`
- **Setup**: Service account credentials

### Microsoft Teams
- **Integration**: Bot Framework
- **Config Key**: `msteams`
- **Setup**: Azure Bot registration

## Extension Channels

These require installing plugins from the `extensions/` directory:

| Channel | Plugin | Notes |
|---------|--------|-------|
| Matrix | `extensions/matrix/` | End-to-end encryption support |
| BlueBubbles | `extensions/bluebubbles/` | Alternative iMessage |
| Zalo | `extensions/zalo/` | Vietnamese messaging |
| Zalo Personal | `extensions/zalo-user/` | Personal Zalo account |
| LINE | `src/line/` | Built-in |

## Security & Access Control

### DM Policy Options

| Policy | Behavior |
|--------|----------|
| `pairing` | Unknown senders get pairing code (default) |
| `open` | Accept all DMs (requires explicit opt-in) |
| `closed` | Reject all unknown DMs |

### Allowlists

- `allowFrom`: Array of allowed senders
- `groups`: Array of allowed group IDs (or `"*"` for all)

### Pairing Flow

1. Unknown sender messages bot
2. Bot sends pairing code
3. Owner approves: `cml-hive-assist pairing approve <channel> <code>`
4. Sender added to allowlist

## Group Message Handling

### Activation Modes

| Mode | Behavior |
|------|----------|
| `mention` | Only respond when mentioned |
| `always` | Respond to all messages |

### Configuration

```json5
{
  "channels": {
    "telegram": {
      "groups": {
        "group-id": {
          "requireMention": true,
          "activation": "mention"
        }
      }
    }
  }
}
```

## WebChat

- Built into Gateway, no separate config
- Access via Gateway dashboard URL
- Uses WebSocket connection
