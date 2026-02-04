# Creating Skills - Step by Step

## Prerequisites

- CML Hive Assist installed and running
- Access to workspace directory (`~/.cml-hive-assist/workspace/`)

## Step 1: Define the Skill Purpose

Before creating, answer:
1. What specific task will this skill help with?
2. What triggers should activate it?
3. What tools/commands are involved?
4. What does the AI need to know that it doesn't already?

## Step 2: Create the Directory

```bash
mkdir -p ~/.cml-hive-assist/workspace/skills/my-skill
```

## Step 3: Write SKILL.md

### Minimal Version

Create `~/.cml-hive-assist/workspace/skills/my-skill/SKILL.md`:

```markdown
---
name: my-skill
description: "Helps with X task. Use when user mentions Y or wants to Z."
---

# My Skill

## How to Use

When the user asks about X:
1. First, check the current state with `command --status`
2. Then, perform the action with `command --do-thing`

## Example

User: "Help me with X"
Action: Run `command --example`
```

### With Gating

```markdown
---
name: my-skill
description: "Helps with X task using the mytool CLI."
metadata:
  {
    "cml-hive-assist": {
      "requires": { "bins": ["mytool"] },
      "install": [
        {
          "id": "brew",
          "kind": "brew",
          "formula": "mytool",
          "label": "Install mytool (Homebrew)"
        }
      ]
    }
  }
---

# My Skill

Instructions here...
```

## Step 4: Test the Skill

1. Send a message that should trigger your skill
2. Check if the AI uses the skill correctly
3. Look for:
   - Did the skill activate?
   - Did the AI follow instructions?
   - Were there any errors?

## Step 5: Iterate

Based on testing:
- Clarify ambiguous instructions
- Add missing edge cases
- Remove unnecessary text
- Add examples if AI struggles

## Adding Scripts (Optional)

For complex operations:

```bash
mkdir ~/.cml-hive-assist/workspace/skills/my-skill/scripts
```

Create `scripts/helper.sh`:
```bash
#!/bin/bash
# Helper script for my-skill
echo "Processing $1..."
```

Reference in SKILL.md:
```markdown
## Processing Data

Run the helper script:
```bash
bash scripts/helper.sh input-file.txt
```
```

## Adding References (Optional)

For extensive documentation:

```bash
mkdir ~/.cml-hive-assist/workspace/skills/my-skill/references
```

Create `references/detailed-api.md`:
```markdown
# API Reference

## Endpoint: /api/v1/action

**Method**: POST

**Parameters**:
- `input`: The input data
- `format`: Output format (json|xml)

**Response**:
```json
{
  "status": "success",
  "result": {...}
}
```
```

Reference in SKILL.md:
```markdown
For complete API details, see [references/detailed-api.md](references/detailed-api.md)
```

## Using the Init Script (Advanced)

If you have the skill-creator skill bundled:

```bash
# From the skills directory
scripts/init_skill.py my-skill --path ~/.cml-hive-assist/workspace/skills --resources scripts,references
```

This creates a template with proper structure.

## Publishing to ClawHub

Once your skill is polished:

```bash
# Package the skill
scripts/package_skill.py ~/.cml-hive-assist/workspace/skills/my-skill

# Publish (requires ClawHub account)
cml-hive-assist skills publish my-skill.skill
```

## Troubleshooting

### Skill Not Triggering

1. Check description includes trigger words
2. Verify skill is in correct location
3. Run `cml-hive-assist skills list` to confirm visibility

### AI Not Following Instructions

1. Make instructions more explicit
2. Add concrete examples
3. Remove ambiguous language
4. Test with simpler cases first

### Script Errors

1. Test scripts manually first
2. Check file permissions
3. Verify paths are correct
4. Add error handling to scripts
