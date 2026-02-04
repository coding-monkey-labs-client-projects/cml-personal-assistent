# How Skills Work

## The Three-Level Loading System

Skills use **progressive disclosure** to manage context efficiently:

### Level 1: Metadata (Always in Context)
- **What**: `name` + `description` from YAML frontmatter
- **Size**: ~100 words per skill
- **Purpose**: Helps AI decide when to activate the skill

### Level 2: SKILL.md Body (Loaded on Trigger)
- **What**: Full markdown instructions
- **Size**: Target <5,000 words
- **Purpose**: Detailed guidance for executing tasks

### Level 3: Bundled Resources (On Demand)
- **What**: Scripts, references, assets
- **Size**: Unlimited (loaded selectively)
- **Purpose**: Supporting materials

## Skill Activation Flow

```
User Message
     │
     ▼
┌─────────────────────┐
│  AI reads all skill │
│  descriptions       │◄── Level 1: Always present
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Match found?       │
│  Load SKILL.md body │◄── Level 2: Triggered
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Need more info?    │
│  Load references/   │◄── Level 3: As needed
│  scripts            │
└─────────────────────┘
```

## Trigger Mechanism

The AI decides to use a skill based on:

1. **Keyword matching** - User mentions relevant terms
2. **Intent detection** - User's goal matches skill purpose
3. **Context relevance** - Skill fits the conversation

### Good Description Example

```yaml
description: "Interact with GitHub using the `gh` CLI. Use for issues, PRs, CI runs, and API queries."
```

Why it works:
- Mentions specific tool (`gh`)
- Lists concrete use cases (issues, PRs, CI)
- Implies when to trigger

### Poor Description Example

```yaml
description: "A helpful skill."
```

Why it fails:
- No specific triggers
- Too vague
- AI can't determine when to use it

## Context Window Management

The context window is shared across:
- System prompt
- Conversation history
- All skill metadata
- Currently active skill body
- Tool results

### Why Brevity Matters

Every skill description consumes tokens:
- 53 bundled skills × ~100 words = 5,300+ words always present
- Your custom skills add to this

### The "Do I Need This?" Test

For each line in your skill, ask:
- Does the AI not already know this?
- Is this essential for correct behavior?
- Would removal cause failures?

## Gating System

Skills can be conditionally available:

### Require CLI Tools
```yaml
metadata:
  cml-hive-assist:
    requires:
      bins: ["gh", "jq"]
```

Skill only activates if `gh` and `jq` are installed.

### Require Environment Variables
```yaml
metadata:
  cml-hive-assist:
    requires:
      env: ["GITHUB_TOKEN"]
```

### Require OS
```yaml
metadata:
  cml-hive-assist:
    os: ["darwin"]  # macOS only
```

### Always Active
```yaml
metadata:
  cml-hive-assist:
    always: true  # Skip all gates
```

## Skill Precedence

When multiple skills have the same name:

1. **Workspace** (`~/.cml-hive-assist/workspace/skills/`) - wins
2. **Managed** (`~/.cml-hive-assist/skills/`) - second
3. **Bundled** (`<install>/skills/`) - last

This lets you override bundled skills with custom versions.
