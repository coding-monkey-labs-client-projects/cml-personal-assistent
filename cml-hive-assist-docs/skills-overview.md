# CML Hive Assist - Skills Overview

## What are Skills?

Skills are **modular, markdown-based capability definitions** that extend the AI assistant's capabilities. They are essentially "onboarding guides" for specific domains or tasks - transforming the general-purpose agent into a specialized expert.

## Key Concept: No-Code Extensibility

Skills are defined using **Markdown files only** - no programming required. This enables:
- Rapid prototyping of new capabilities
- Easy customization by non-developers
- Version-controlled knowledge bases

## Skill Locations (Precedence Order)

1. **Workspace Skills** (highest priority)
   - Path: `~/.cml-hive-assist/workspace/skills/<skill>/`
   - User-created, project-specific skills

2. **Managed Skills**
   - Path: `~/.cml-hive-assist/skills/<skill>/`
   - Downloaded/installed from ClawHub registry

3. **Bundled Skills** (lowest priority)
   - Path: `<install>/skills/<skill>/`
   - Ships with CML Hive Assist (~53 skills)

## Skill Structure

```
skill-name/
├── SKILL.md          # Required: Main skill definition
├── scripts/          # Optional: Executable scripts
├── references/       # Optional: Reference documents
└── assets/           # Optional: Files for output
```

### SKILL.md Format

```markdown
---
name: skill-name
description: "What this skill does and when to use it"
metadata:
  {
    "cml-hive-assist": {
      "emoji": "🔧",
      "requires": { "bins": ["tool-name"] },
      "install": [
        {
          "id": "brew",
          "kind": "brew",
          "formula": "tool-name",
          "label": "Install via Homebrew"
        }
      ]
    }
  }
---

# Skill Title

Instructions for the AI agent on how to use this skill...
```

## Gating Options

Skills can specify requirements:

| Gate | Purpose |
|------|---------|
| `requires.bins` | Required CLI tools |
| `requires.env` | Required environment variables |
| `requires.config` | Required config paths |
| `os` | Platform restrictions (darwin, linux, win32) |
| `always: true` | Skip all gates |

## Bundled Skills Categories

### Productivity (12 skills)
- `apple-notes`, `apple-reminders`, `bear-notes`
- `notion`, `obsidian`, `things-mac`, `trello`
- `1password`, `himalaya` (email)

### Communication (5 skills)
- `discord`, `slack`, `imsg`, `bluebubbles`, `voice-call`

### AI & Models (5 skills)
- `gemini`, `openai-whisper`, `openai-whisper-api`
- `oracle`, `coding-agent`

### Media (6 skills)
- `nano-pdf`, `video-frames`, `peekaboo` (screenshots)
- `camsnap`, `openai-image-gen`, `gifgrep`

### Developer Tools (3 skills)
- `github`, `tmux`, `skill-creator`

### Home & Lifestyle (5 skills)
- `openhue` (lights), `weather`, `spotify-player`
- `sonoscli`, `goplaces`

### System (5 skills)
- `healthcheck`, `model-usage`, `session-logs`
- `clawhub`, `summarize`

### Food & Shopping (3 skills)
- `food-order`, `ordercli`, `local-places`

## Skill Lifecycle

1. **Discovery**: Agent sees skill metadata (name + description)
2. **Triggering**: User message matches skill description
3. **Loading**: SKILL.md body loaded into context
4. **Execution**: Agent follows skill instructions
5. **Resources**: Scripts/references loaded as needed

## ClawHub Registry

ClawHub is the skill marketplace:
- Search: `cml-hive-assist skills search <query>`
- Install: `cml-hive-assist skills install <skill>`
- Publish: `cml-hive-assist skills publish <path>`

Website: https://clawhub.com

## Creating Custom Skills

See the [adding-skills/](adding-skills/) directory for complete guidelines on creating your own skills without writing code.
