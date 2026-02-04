# CML Hive Assist - Project Structure

## Root Directory

```
cml-hive-assist/
├── src/                    # TypeScript source code
├── skills/                 # Bundled skills (~53 skills)
├── extensions/             # Optional channel plugins (~30)
├── apps/                   # Native applications
│   ├── macos/             # macOS menu bar app
│   ├── ios/               # iOS node app
│   └── android/           # Android node app
├── ui/                     # Control UI web interface
├── docs/                   # Documentation (10k+ files)
├── scripts/                # Build and utility scripts
├── Swabble/                # Swift audio/speech library
├── package.json            # Node.js package definition
├── cml-hive-assist.mjs            # CLI entry point
└── README.md               # Main documentation
```

## Source Code (`src/`)

### Core Directories

| Directory | Purpose |
|-----------|---------|
| `agents/` | AI agent runtime (300+ files) |
| `gateway/` | WebSocket control plane (127 files) |
| `config/` | Configuration management (124 files) |
| `cli/` | CLI commands and routing (107 files) |
| `commands/` | Command implementations (177 files) |
| `infra/` | Infrastructure utilities (152 files) |

### Channel Implementations

| Directory | Channel |
|-----------|---------|
| `telegram/` | Telegram bot (83 files) |
| `discord/` | Discord bot (44 files) |
| `slack/` | Slack bot (36 files) |
| `signal/` | Signal integration (24 files) |
| `line/` | LINE messaging (36 files) |
| `imessage/` | iMessage (15 files) |
| `whatsapp/` | WhatsApp via Baileys (4 files) |

### Supporting Modules

| Directory | Purpose |
|-----------|---------|
| `browser/` | Playwright-based browser control |
| `canvas-host/` | Canvas rendering engine |
| `hooks/` | Event hooks system |
| `memory/` | Session memory/context |
| `media/` | Media processing pipeline |
| `plugins/` | Plugin system |
| `security/` | Security and permissions |
| `sessions/` | Session management |
| `tui/` | Terminal UI components |
| `web/` | Web UI server |
| `wizard/` | Onboarding wizard |

## Skills Directory (`skills/`)

53 bundled skills organized by domain:

### Productivity
- `apple-notes/`, `apple-reminders/`, `bear-notes/`
- `notion/`, `obsidian/`, `things-mac/`, `trello/`

### Communication
- `discord/`, `slack/`, `imsg/`, `bluebubbles/`

### AI/Models
- `gemini/`, `openai-whisper/`, `oracle/`, `coding-agent/`

### Utilities
- `github/`, `healthcheck/`, `summarize/`, `weather/`
- `spotify-player/`, `nano-pdf/`, `video-frames/`

### System
- `clawhub/`, `skill-creator/`, `session-logs/`, `model-usage/`

## Apps Directory (`apps/`)

### macOS (`apps/macos/`)
- SwiftUI menu bar application
- Voice Wake integration
- Talk Mode overlay
- Gateway control

### iOS (`apps/ios/`)
- Canvas surface
- Voice trigger forwarding
- Camera integration

### Android (`apps/android/`)
- Kotlin-based node app
- Canvas, Camera, Screen capture

## Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | npm package definition |
| `tsconfig.json` | TypeScript configuration |
| `.env.example` | Environment variables template |
| `.oxlintrc.json` | Linting configuration |
| `vitest.config.ts` | Test configuration |
