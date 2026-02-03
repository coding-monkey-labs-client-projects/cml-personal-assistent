# Skill Examples

Real-world examples of skills you can create.

## Example 1: Simple CLI Wrapper

### Use Case
Interact with a weather API via CLI

### SKILL.md
```markdown
---
name: weather-cli
description: "Get weather information using the wttr.in service. Use when user asks about weather, forecast, or temperature."
---

# Weather CLI Skill

## Quick Weather

Get current weather for a city:
```bash
curl -s "wttr.in/CityName?format=3"
```

## Detailed Forecast

Get 3-day forecast:
```bash
curl -s "wttr.in/CityName"
```

## Weather by Location

For specific coordinates:
```bash
curl -s "wttr.in/40.7,-74.0"
```

## Examples

- "What's the weather in Tokyo?" → `curl -s "wttr.in/Tokyo?format=3"`
- "Show me the forecast for Paris" → `curl -s "wttr.in/Paris"`
```

---

## Example 2: Project Management

### Use Case
Manage tasks in a specific format

### SKILL.md
```markdown
---
name: project-tasks
description: "Manage project tasks in TODO.md files. Use when user mentions tasks, todos, project management, or checklist."
---

# Project Tasks Skill

## File Format

Tasks live in `TODO.md` at project root:

```markdown
# Project Tasks

## In Progress
- [ ] Task description @assignee #priority

## Done
- [x] Completed task
```

## Adding Tasks

When user wants to add a task:
1. Read existing `TODO.md`
2. Add new item under "In Progress"
3. Use format: `- [ ] Description @user #priority`

## Completing Tasks

When user completes a task:
1. Find the task in "In Progress"
2. Change `[ ]` to `[x]`
3. Move to "Done" section

## Priority Labels

- `#urgent` - Do immediately
- `#high` - Do today
- `#medium` - Do this week
- `#low` - Do when possible
```

---

## Example 3: API Integration

### Use Case
Query a REST API with authentication

### SKILL.md
```markdown
---
name: my-api
description: "Interact with MyAPI service. Use for fetching data, creating records, or updating entries in MyAPI."
metadata:
  {
    "cml-hive-assist": {
      "requires": { "env": ["MY_API_KEY"] }
    }
  }
---

# MyAPI Skill

## Authentication

All requests need the API key header:
```bash
-H "Authorization: Bearer $MY_API_KEY"
```

## List Records

```bash
curl -s -H "Authorization: Bearer $MY_API_KEY" \
  "https://api.example.com/v1/records"
```

## Get Single Record

```bash
curl -s -H "Authorization: Bearer $MY_API_KEY" \
  "https://api.example.com/v1/records/{id}"
```

## Create Record

```bash
curl -s -X POST \
  -H "Authorization: Bearer $MY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "value"}' \
  "https://api.example.com/v1/records"
```

## Common Tasks

### Find by name
```bash
curl -s -H "Authorization: Bearer $MY_API_KEY" \
  "https://api.example.com/v1/records?name=search-term"
```
```

---

## Example 4: Multi-File Skill with References

### Use Case
Complex workflow with detailed documentation

### Structure
```
database-admin/
├── SKILL.md
└── references/
    ├── queries.md
    └── maintenance.md
```

### SKILL.md
```markdown
---
name: database-admin
description: "PostgreSQL database administration. Use for queries, backups, maintenance, or database troubleshooting."
metadata:
  {
    "cml-hive-assist": {
      "requires": { "bins": ["psql"] }
    }
  }
---

# Database Admin Skill

## Quick Commands

### Check connection
```bash
psql -h localhost -U user -d database -c "SELECT 1"
```

### List tables
```bash
psql -h localhost -U user -d database -c "\dt"
```

## Detailed References

- **Common queries**: See [references/queries.md](references/queries.md)
- **Maintenance tasks**: See [references/maintenance.md](references/maintenance.md)
```

### references/queries.md
```markdown
# Common Database Queries

## User Management

### List users
```sql
SELECT usename FROM pg_user;
```

### Create user
```sql
CREATE USER newuser WITH PASSWORD 'password';
```

## Table Operations

### Table size
```sql
SELECT pg_size_pretty(pg_relation_size('table_name'));
```

### Row counts
```sql
SELECT reltuples AS estimate FROM pg_class WHERE relname = 'table_name';
```
```

---

## Example 5: Skill with Script

### Use Case
Process files with a helper script

### Structure
```
pdf-processor/
├── SKILL.md
└── scripts/
    └── extract_pages.py
```

### SKILL.md
```markdown
---
name: pdf-processor
description: "Extract and manipulate PDF pages. Use when user wants to split, extract, or process PDF files."
metadata:
  {
    "cml-hive-assist": {
      "requires": { "bins": ["python3"] }
    }
  }
---

# PDF Processor Skill

## Extract Pages

To extract specific pages from a PDF:

```bash
python3 scripts/extract_pages.py input.pdf 1-5 output.pdf
```

## Arguments

- `input.pdf`: Source PDF file
- `1-5`: Page range (1-indexed)
- `output.pdf`: Destination file

## Examples

- Extract first 10 pages: `python3 scripts/extract_pages.py doc.pdf 1-10 first_ten.pdf`
- Extract single page: `python3 scripts/extract_pages.py doc.pdf 5-5 page_five.pdf`
```

### scripts/extract_pages.py
```python
#!/usr/bin/env python3
import sys
from PyPDF2 import PdfReader, PdfWriter

def extract_pages(input_path, page_range, output_path):
    start, end = map(int, page_range.split('-'))
    reader = PdfReader(input_path)
    writer = PdfWriter()

    for i in range(start - 1, end):
        writer.add_page(reader.pages[i])

    with open(output_path, 'wb') as f:
        writer.write(f)

if __name__ == '__main__':
    extract_pages(sys.argv[1], sys.argv[2], sys.argv[3])
```
