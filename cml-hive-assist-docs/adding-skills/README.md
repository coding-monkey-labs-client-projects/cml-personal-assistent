# Adding Skills - No-Code Skill Creation Guide

This directory contains guidelines for creating new skills in CML Hive Assist **without writing any code**.

## What You'll Learn

1. **[how-skills-work.md](how-skills-work.md)** - Understanding the skill system
2. **[skill-structure.md](skill-structure.md)** - File structure and format
3. **[creating-skills.md](creating-skills.md)** - Step-by-step creation guide
4. **[skill-examples.md](skill-examples.md)** - Real-world examples
5. **[best-practices.md](best-practices.md)** - Tips and patterns

## Quick Start

1. Create a new directory: `~/.cml-hive-assist/workspace/skills/my-skill/`
2. Create `SKILL.md` with frontmatter and instructions
3. Test by mentioning the skill topic to your assistant
4. Iterate based on results

## The No-Code Advantage

Skills are pure Markdown - no programming required:
- Define capabilities in plain English
- Add examples and workflows
- Let the AI agent interpret and execute

## Where Skills Live

| Location | Purpose | Priority |
|----------|---------|----------|
| `~/.cml-hive-assist/workspace/skills/` | Your custom skills | Highest |
| `~/.cml-hive-assist/skills/` | Downloaded skills | Medium |
| `<install>/skills/` | Bundled skills | Lowest |

## Minimum Viable Skill

```markdown
---
name: my-skill
description: "What this skill does. Use when the user asks about X or wants to Y."
---

# My Skill

Instructions for the AI agent:
1. When the user asks about X, do Y
2. Use the `tool-name` command for Z
```

That's it! Save as `SKILL.md` and your skill is active.
