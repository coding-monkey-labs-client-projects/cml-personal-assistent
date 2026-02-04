# Task 1: Remove Non-Essential Skills

## Status: COMPLETED

## Objective

Remove all skills except those related to WhatsApp, Telegram, WebChat, and core utilities (healthcheck, skill-creator, security-audit).

## Skills KEPT

- `healthcheck` - Core utility
- `skill-creator` - Core utility
- `security-audit` - Core utility
- `wacli` - WhatsApp CLI tool (WhatsApp related)
- `voice-call` - Communication skill (needed for WebChat/communications)

## Skills REMOVED

### Chat/Channel Skills (not WhatsApp/Telegram/WebChat)

- [x] `discord` - Discord skill
- [x] `slack` - Slack skill
- [x] `imsg` - iMessage skill
- [x] `bluebubbles` - BlueBubbles (iMessage alternative)

### Other Non-Essential Skills

- [x] `1password` - Password manager integration
- [x] `apple-notes` - Apple Notes integration
- [x] `apple-reminders` - Apple Reminders integration
- [x] `bear-notes` - Bear Notes integration
- [x] `bird` - Twitter/Bird integration
- [x] `blogwatcher` - Blog monitoring
- [x] `blucli` - BlueCLI tool
- [x] `camsnap` - Camera snapshot
- [x] `canvas` - Canvas integration
- [x] `clawhub` - ClawHub integration
- [x] `coding-agent` - Coding agent
- [x] `eightctl` - Eight Sleep control
- [x] `food-order` - Food ordering
- [x] `gemini` - Gemini AI
- [x] `gifgrep` - GIF search
- [x] `github` - GitHub integration
- [x] `gog` - GOG integration
- [x] `goplaces` - Places/location
- [x] `himalaya` - Email client
- [x] `local-places` - Local places
- [x] `mcporter` - MC Porter tool
- [x] `model-usage` - Model usage tracking
- [x] `nano-banana-pro` - Nano Banana Pro
- [x] `nano-pdf` - PDF handling
- [x] `notion` - Notion integration
- [x] `obsidian` - Obsidian notes
- [x] `openai-image-gen` - OpenAI image generation
- [x] `openai-whisper` - OpenAI Whisper
- [x] `openai-whisper-api` - OpenAI Whisper API
- [x] `openhue` - Philips Hue
- [x] `oracle` - Oracle integration
- [x] `ordercli` - Order CLI
- [x] `peekaboo` - Peekaboo tool
- [x] `sag` - SAG tool
- [x] `session-logs` - Session logging
- [x] `sherpa-onnx-tts` - Text-to-speech
- [x] `songsee` - Song recognition
- [x] `sonoscli` - Sonos control
- [x] `spotify-player` - Spotify
- [x] `summarize` - Summarization
- [x] `things-mac` - Things app (macOS)
- [x] `tmux` - Terminal multiplexer
- [x] `trello` - Trello integration
- [x] `video-frames` - Video frame extraction
- [x] `weather` - Weather info

## Progress Log

### Step 1: Document skills to remove

- [x] Listed all skills in skills/ directory
- [x] Identified skills to keep vs remove

### Step 2: Remove skill directories

- [x] Removed all 49 non-essential skill directories

### Step 3: Search for imports/references

- [x] Searched src/ for imports of removed skills - No direct imports found
- [x] Skills are dynamically loaded, not statically imported

### Step 4: Verify build

- [x] Ran pnpm build
- [x] Build succeeded (TypeScript compilation completed)
- [x] Only pre-existing A2UI bundle error occurred (acceptable as documented)

### Step 5: Document completion

- [x] Updated this file with completion status

## Completion Date

2026-02-04

## Notes

- The A2UI bundle error is pre-existing and documented as acceptable
- Skills directory now contains only 5 skills: healthcheck, security-audit, skill-creator, voice-call, wacli
- No new build errors introduced
