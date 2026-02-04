# CML Hive Assist Security Guide

This directory contains security documentation for CML Hive Assist, including configuration guidelines, security decisions, and best practices for secure deployment.

## Overview

CML Hive Assist is a powerful AI agent system that can execute code, access files, and interact with external services. This power requires careful security configuration to prevent unauthorized access and protect sensitive data.

## Threat Model

### Primary Threats

1. **Prompt Injection** - Malicious instructions embedded in messages that attempt to override agent behavior
2. **Unauthorized Access** - Unknown users or devices attempting to interact with the agent
3. **Data Exfiltration** - Attempts to extract sensitive information (credentials, files, etc.)
4. **Destructive Operations** - Commands that could damage files or systems
5. **Privilege Escalation** - Attempts to gain elevated access beyond intended permissions

### Defense Layers

CML Hive Assist provides multiple layers of defense:

1. **Channel-Level Controls** - DM policies, allowlists, and pairing requirements
2. **Sandbox Isolation** - Docker-based execution environment
3. **Tool Restrictions** - Allowlists and denylists for tool access
4. **Path Controls** - File system access restrictions
5. **Command Filtering** - Blocked dangerous command patterns
6. **Audit Logging** - Comprehensive activity logging

## Quick Start

1. Review the [configuration guide](configuration.md) for security settings
2. Copy the secure configuration template from `../workspace-templates/secure-config.json5`
3. Add `SECURITY.md` from `../workspace-templates/SECURITY.md` to your workspace
4. Run `cml-hive-assist security audit` to check your configuration
5. Review the [decisions log](decisions.md) for rationale behind security choices

## Security Checklist

### Essential (Do First)

- [ ] Set DM policy to `pairing` for all channels
- [ ] Bind gateway to `loopback` only
- [ ] Configure explicit `allowFrom` lists for channels
- [ ] Enable audit logging
- [ ] Review and customize denied command patterns

### Recommended

- [ ] Enable sandbox mode (`non-main` or `always`)
- [ ] Configure `allowPaths` and `denyPaths`
- [ ] Disable browser tool unless explicitly needed
- [ ] Add `SECURITY.md` to your workspace
- [ ] Use environment variables for sensitive values

### Advanced

- [ ] Configure Docker sandbox with resource limits
- [ ] Set up AppArmor/seccomp profiles for sandbox
- [ ] Implement rate limiting
- [ ] Configure DNS restrictions for sandbox
- [ ] Review and customize tool allowlists

## Files in This Directory

| File                                 | Description                                 |
| ------------------------------------ | ------------------------------------------- |
| [README.md](README.md)               | This overview document                      |
| [configuration.md](configuration.md) | Detailed security configuration guide       |
| [decisions.md](decisions.md)         | Record of security decisions with rationale |

## Related Documentation

- [Gateway Security](https://docs.cml-hive-assist.ai/gateway/security) - Production security guidance
- [Channels Guide](../channels-guide.md) - Channel-specific configuration
- [Skills Overview](../skills-overview.md) - Skill security considerations

## Reporting Security Issues

If you discover a security vulnerability in CML Hive Assist, please report it privately. See the main [SECURITY.md](../../SECURITY.md) file for reporting instructions.

## Security Audit Command

CML Hive Assist includes a built-in security audit capability:

```bash
# Basic security audit
cml-hive-assist security audit

# Deep audit with detailed recommendations
cml-hive-assist security audit --deep

# Audit with automatic fix suggestions
cml-hive-assist security audit --fix
```

You can also use the `/security-audit` skill within a conversation to check security configuration.
