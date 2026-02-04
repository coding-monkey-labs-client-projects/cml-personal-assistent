---
name: security-audit
description: "Audit your CML Hive Assist security configuration. Checks DM policies, sandbox settings, path restrictions, and provides security recommendations."
metadata:
  { "cml-hive-assist": { "emoji": "shield", "category": "security", "requires": { "bins": [] } } }
---

# Security Audit Skill

This skill helps you audit your CML Hive Assist security configuration and identify potential vulnerabilities.

## Usage

Run a security audit on your configuration:

```
/security-audit
```

Or with specific focus areas:

```
/security-audit --focus channels
/security-audit --focus sandbox
/security-audit --focus tools
```

## What This Skill Checks

### 1. DM Policy Configuration

Verifies that Direct Message policies are properly configured:

- **Critical**: DM policy set to "open" without explicit allowlist
- **Warning**: DM policy set to "allowlist" with wildcards
- **Good**: DM policy set to "pairing" (recommended)

Checks across all channels:

- WhatsApp
- Telegram
- Discord
- Slack
- Signal
- iMessage
- BlueBubbles

### 2. Gateway Security

Checks gateway binding and authentication:

- **Critical**: Gateway bound to all interfaces (0.0.0.0) without authentication
- **Warning**: Gateway bound to network with weak authentication
- **Good**: Gateway bound to loopback or using strong authentication

### 3. Sandbox Configuration

Verifies sandboxing is properly configured:

- **Critical**: Sandbox mode is "off" for production deployment
- **Warning**: Sandbox mode is "non-main" (partial protection)
- **Good**: Sandbox mode is "always" (full protection)

Also checks:

- Workspace access permissions
- Docker security settings
- Resource limits

### 4. Tool Restrictions

Analyzes tool configuration:

- **Critical**: Elevated tools enabled without restrictions
- **Warning**: Browser tool enabled without sandboxing
- **Good**: Appropriate tool restrictions in place

### 5. Path Access Controls

Reviews file system access:

- **Critical**: Sensitive paths accessible (~/.ssh, ~/.aws, etc.)
- **Warning**: Broad path access without deny rules
- **Good**: Restricted paths with explicit allow/deny rules

### 6. Command Restrictions

Checks for dangerous command patterns:

- **Critical**: No denied command patterns configured
- **Warning**: Incomplete command restrictions
- **Good**: Comprehensive command pattern blocking

### 7. Audit Logging

Verifies audit logging configuration:

- **Warning**: Audit logging not enabled
- **Good**: Tool and file operation auditing enabled

## Audit Output

The audit produces:

1. **Security Score**: 0-100 rating
2. **Security Level**: Critical, Warning, Good, or Excellent
3. **Issues List**: Detailed issues with severity
4. **Recommendations**: Actionable security improvements

## Example Audit

```
Security Audit Results
======================

Score: 72/100
Level: WARNING

Issues Found:
[HIGH] channels.telegram.dmPolicy is "open" - should be "pairing"
[MEDIUM] agents.defaults.sandbox.mode is "non-main" - consider "always"
[LOW] logging.auditTools is not enabled

Recommendations:
1. Set all channel DM policies to "pairing"
2. Enable sandbox mode "always" for maximum protection
3. Enable audit logging for tools and file operations
4. Add denied command patterns for dangerous operations
5. Configure explicit denyPaths for sensitive directories

Quick Fix Commands:
cml-hive-assist config set channels.telegram.dmPolicy pairing
cml-hive-assist config set agents.defaults.sandbox.mode always
cml-hive-assist config set logging.auditTools true
```

## Security Checklist

Use this checklist to manually verify security:

### Essential

- [ ] All DM policies set to "pairing"
- [ ] Gateway bound to "loopback"
- [ ] Authentication enabled for gateway
- [ ] Audit logging enabled

### Recommended

- [ ] Sandbox mode enabled
- [ ] Path restrictions configured
- [ ] Command patterns blocked
- [ ] Browser tool disabled or sandboxed

### Advanced

- [ ] Docker resource limits configured
- [ ] Rate limiting enabled
- [ ] Per-channel allowlists configured
- [ ] Access groups enabled

## Configuration Paths Checked

| Path                               | Description             |
| ---------------------------------- | ----------------------- |
| `gateway.bind`                     | Gateway network binding |
| `gateway.auth.mode`                | Gateway authentication  |
| `channels.*.dmPolicy`              | DM access policy        |
| `channels.*.allowFrom`             | Allowed senders         |
| `agents.defaults.sandbox.mode`     | Sandbox mode            |
| `agents.defaults.sandbox.docker.*` | Docker settings         |
| `tools.bash.deniedPatterns`        | Blocked commands        |
| `tools.browser.enabled`            | Browser tool status     |
| `logging.auditTools`               | Tool audit logging      |
| `logging.auditFileOps`             | File op audit logging   |

## Related Documentation

- [Security Configuration Guide](../../cml-hive-assist-docs/security/configuration.md)
- [Security Decisions](../../cml-hive-assist-docs/security/decisions.md)
- [Secure Config Template](../../cml-hive-assist-docs/workspace-templates/secure-config.json5)

## CLI Alternative

You can also run security audits via CLI:

```bash
# Basic audit
cml-hive-assist security audit

# Deep audit with more checks
cml-hive-assist security audit --deep

# Show fix commands
cml-hive-assist security audit --fix

# Output as JSON
cml-hive-assist security audit --json
```
