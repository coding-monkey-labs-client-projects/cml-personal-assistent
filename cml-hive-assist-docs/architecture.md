# CML Hive Assist - Architecture Overview

## What is CML Hive Assist?

CML Hive Assist (based on CML Hive Assist) is a **personal AI assistant platform** that runs on your own devices. It answers you on channels you already use (WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, iMessage, Microsoft Teams, WebChat), plus extension channels like BlueBubbles, Matrix, Zalo, and Zalo Personal.

## High-Level Architecture

```
Messaging Channels (WhatsApp/Telegram/Slack/Discord/etc.)
                    │
                    ▼
┌───────────────────────────────────────┐
│              GATEWAY                   │
│         (Control Plane)                │
│       ws://127.0.0.1:18789            │
├───────────────────────────────────────┤
│  • Sessions Management                 │
│  • Channel Routing                     │
│  • Tool Orchestration                  │
│  • Config Management                   │
│  • WebSocket Server                    │
└──────────────┬────────────────────────┘
               │
    ┌──────────┼──────────┬──────────────┐
    │          │          │              │
    ▼          ▼          ▼              ▼
┌───────┐  ┌───────┐  ┌───────┐   ┌──────────┐
│  Pi   │  │  CLI  │  │ WebUI │   │  Native  │
│ Agent │  │       │  │       │   │   Apps   │
│ (RPC) │  │       │  │       │   │(macOS/iOS│
│       │  │       │  │       │   │/Android) │
└───────┘  └───────┘  └───────┘   └──────────┘
```

## Core Components

### 1. Gateway (Control Plane)

The Gateway is the central hub that:

- Manages WebSocket connections
- Routes messages between channels and agents
- Handles session lifecycle
- Manages tool execution
- Serves the Control UI and WebChat

### 2. Pi Agent Runtime

- The AI agent that processes messages
- Runs in RPC mode with tool streaming
- Supports multiple AI models (Anthropic, OpenAI, etc.)

### 3. Channels

- **WhatsApp** - via Baileys web library
- **Telegram** - via grammY
- **Slack** - via Bolt
- **Discord** - via discord.js
- **Google Chat** - via Chat API
- **Signal** - via signal-cli
- **iMessage** - via imsg (macOS only)
- **Microsoft Teams** - via Bot Framework
- **Matrix**, **Zalo**, **BlueBubbles** - via extensions

### 4. Skills System

- Markdown-based capability definitions
- No-code extensibility
- Three-tier precedence: Workspace > Managed > Bundled

### 5. Native Apps (Optional)

- **macOS** - Menu bar app, Voice Wake, Talk Mode
- **iOS/Android** - Canvas, Voice, Camera, Screen recording

## Key Subsystems

| Subsystem | Purpose                            |
| --------- | ---------------------------------- |
| Sessions  | Conversation context management    |
| Routing   | Channel-to-agent message routing   |
| Tools     | Browser, Canvas, Nodes, Cron       |
| Plugins   | Channel extensions                 |
| Config    | JSON5 configuration system         |
| Security  | DM pairing, allowlists, sandboxing |

## Data Flow

1. **Inbound**: Channel → Gateway → Session → Agent → Tools
2. **Outbound**: Agent Response → Session → Gateway → Channel

## Configuration

Main config file: `~/.cml-hive-assist/cml-hive-assist.json`

Workspaces are stored at: `~/.cml-hive-assist/workspace`
