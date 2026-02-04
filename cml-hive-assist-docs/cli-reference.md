# CML Hive Assist - CLI Reference

## Installation

```bash
npm install -g cml-hive-assist@latest
# or
pnpm add -g cml-hive-assist@latest
```

## Core Commands

### Gateway

```bash
# Start gateway
cml-hive-assist gateway [--port 18789] [--verbose]

# Gateway daemon
cml-hive-assist gateway daemon install
cml-hive-assist gateway daemon start
cml-hive-assist gateway daemon stop
cml-hive-assist gateway daemon status
```

### Agent

```bash
# Send message to agent
cml-hive-assist agent --message "Hello"

# With options
cml-hive-assist agent --message "Help me" --thinking high --model anthropic/claude-opus-4-5
```

### Messages

```bash
# Send message via channel
cml-hive-assist message send --to +1234567890 --message "Hello"
```

### Onboarding

```bash
# Start onboarding wizard
cml-hive-assist onboard

# With daemon installation
cml-hive-assist onboard --install-daemon
```

## Channel Commands

```bash
# Login to WhatsApp
cml-hive-assist channels login

# List channels
cml-hive-assist channels list

# Channel status
cml-hive-assist channels status

# Add channel
cml-hive-assist channels add telegram

# Remove channel
cml-hive-assist channels remove telegram
```

## Pairing

```bash
# List pending pairings
cml-hive-assist pairing list

# Approve pairing
cml-hive-assist pairing approve <channel> <code>

# Reject pairing
cml-hive-assist pairing reject <channel> <code>
```

## Skills

```bash
# List skills
cml-hive-assist skills list

# Enable skill
cml-hive-assist skills enable github

# Disable skill
cml-hive-assist skills disable voice-call

# Install skill
cml-hive-assist skills install <skill-name>
```

## Nodes

```bash
# List connected nodes
cml-hive-assist nodes list

# Node details
cml-hive-assist nodes describe <node-id>

# Invoke node action
cml-hive-assist nodes invoke <node-id> <action>
```

## Configuration

```bash
# Show config
cml-hive-assist config show

# Edit config
cml-hive-assist config edit

# Set value
cml-hive-assist config set agent.model anthropic/claude-opus-4-5
```

## Diagnostics

```bash
# Health check
cml-hive-assist doctor

# View logs
cml-hive-assist logs [--tail] [--lines 100]

# System info
cml-hive-assist system info
```

## Update

```bash
# Update to latest
cml-hive-assist update

# Update to specific channel
cml-hive-assist update --channel stable|beta|dev
```

## Cron Jobs

```bash
# List cron jobs
cml-hive-assist cron list

# Add cron job
cml-hive-assist cron add "0 9 * * *" "Good morning reminder"

# Remove cron job
cml-hive-assist cron remove <job-id>
```

## Webhooks

```bash
# List webhooks
cml-hive-assist webhooks list

# Add webhook
cml-hive-assist webhooks add <name> <url>

# Remove webhook
cml-hive-assist webhooks remove <name>
```

## Plugins

```bash
# List plugins
cml-hive-assist plugins list

# Install plugin
cml-hive-assist plugins install <plugin-name>

# Update plugins
cml-hive-assist plugins update
```

## Chat Commands

These commands can be sent via chat (WhatsApp/Telegram/etc.):

| Command | Action |
|---------|--------|
| `/status` | Show session status |
| `/new` or `/reset` | Reset session |
| `/compact` | Compact session context |
| `/think <level>` | Set thinking level |
| `/verbose on\|off` | Toggle verbose mode |
| `/usage off\|tokens\|full` | Set usage display |
| `/restart` | Restart gateway (owner) |
| `/activation mention\|always` | Group activation |

## Development

```bash
# Run from source
pnpm cml-hive-assist <command>

# Development mode
pnpm gateway:dev

# Watch mode
pnpm gateway:watch

# Run tests
pnpm test
```
