# Skill Best Practices

## Description Writing

### Do: Be Specific About Triggers

```yaml
# Good
description: "Interact with GitHub using the `gh` CLI. Use for issues, PRs, CI runs, and repository management."

# Bad
description: "A skill for GitHub."
```

### Do: Include Tool Names

```yaml
# Good
description: "Manage Docker containers using docker and docker-compose commands."

# Bad
description: "Container management skill."
```

### Do: List Use Cases

```yaml
# Good
description: "Process PDF files. Use for extracting text, splitting pages, merging documents, or converting formats."

# Bad
description: "PDF utilities."
```

## Instruction Writing

### Do: Use Imperative Mood

```markdown
# Good
When the user asks to create a file:
1. Verify the directory exists
2. Create the file with appropriate permissions
3. Confirm the action

# Bad
The skill can be used to create files. Files might be created
in various directories depending on user preference.
```

### Do: Provide Concrete Examples

```markdown
# Good
## Creating a User

```bash
useradd -m -s /bin/bash newuser
```

This creates user "newuser" with home directory and bash shell.

# Bad
## Creating a User

Use the useradd command with appropriate flags.
```

### Do: Anticipate Edge Cases

```markdown
# Good
## Deleting Files

Before deleting:
1. Check if file exists: `test -f filename`
2. Verify it's not a system file
3. Use `rm filename` (not `rm -rf` unless explicitly needed)

**Never delete without confirmation for:**
- Files in /etc, /usr, /bin
- Files owned by root
- Files with multiple hard links

# Bad
## Deleting Files

Use `rm` to delete files.
```

## Context Management

### Do: Keep SKILL.md Under 500 Lines

Split into references if longer:
```
my-skill/
├── SKILL.md (overview + common tasks)
└── references/
    ├── advanced.md
    └── troubleshooting.md
```

### Do: Use References for Detail

```markdown
# In SKILL.md
## API Endpoints

For basic usage, see examples below. For complete API reference,
see [references/api.md](references/api.md).

### Quick Start
```bash
curl -X GET "https://api.example.com/items"
```
```

### Don't: Duplicate Information

```markdown
# Bad - Same info in SKILL.md and references/
# SKILL.md
The API returns JSON with fields: id, name, status...

# references/api.md
The API returns JSON with fields: id, name, status...
```

## Gating

### Do: Gate External Dependencies

```yaml
metadata:
  cml-hive-assist:
    requires:
      bins: ["docker", "docker-compose"]
```

### Do: Provide Install Options

```yaml
metadata:
  cml-hive-assist:
    requires:
      bins: ["gh"]
    install:
      - id: brew
        kind: brew
        formula: gh
        label: "Install GitHub CLI (Homebrew)"
      - id: apt
        kind: apt
        package: gh
        label: "Install GitHub CLI (apt)"
```

### Don't: Over-Gate

```yaml
# Bad - Too restrictive
metadata:
  cml-hive-assist:
    requires:
      bins: ["bash", "echo", "cat"]  # These are always present
```

## Script Best Practices

### Do: Make Scripts Self-Contained

```python
#!/usr/bin/env python3
"""
Process data files for my-skill.

Usage: python3 process.py input.csv output.json
"""
import sys
import json
import csv

def main():
    if len(sys.argv) != 3:
        print("Usage: python3 process.py input.csv output.json")
        sys.exit(1)
    # ... implementation
```

### Do: Handle Errors Gracefully

```bash
#!/bin/bash
set -e  # Exit on error

if [ -z "$1" ]; then
    echo "Error: Input file required"
    exit 1
fi

if [ ! -f "$1" ]; then
    echo "Error: File not found: $1"
    exit 1
fi
```

### Don't: Require Manual Setup

```python
# Bad - Requires pip install
import some_obscure_library

# Good - Use standard library or document requirement
import json  # Standard library
# Or in SKILL.md: "Requires: pip install some_obscure_library"
```

## Testing

### Do: Test Trigger Phrases

Try various ways users might invoke your skill:
- "Help me with X"
- "I need to do X"
- "Can you X?"
- "X please"

### Do: Test Edge Cases

- Empty inputs
- Missing files
- Invalid parameters
- Network failures (for API skills)

### Do: Document Known Limitations

```markdown
## Limitations

- Maximum file size: 100MB
- Supported formats: PDF, DOCX, TXT
- Requires network access for API calls
```

## Common Mistakes

| Mistake | Solution |
|---------|----------|
| Vague description | Add specific trigger words |
| Too much detail | Move to references |
| Missing examples | Add concrete code samples |
| No error handling | Document failure modes |
| Assuming knowledge | Explain non-obvious steps |
| Duplicating docs | Single source of truth |
