/**
 * Security configuration types for CML Hive Assist.
 *
 * These types define security-related configuration options that can be used
 * to harden the agent against various threats including prompt injection,
 * unauthorized access, and destructive operations.
 *
 * NOTE: Some of these options are proposed extensions to the existing schema.
 * See cml-hive-assist-docs/security/ for implementation guidance.
 */

/**
 * Path-based access control configuration.
 *
 * Defines which file system paths the agent is allowed or denied access to.
 * Used for sandboxing and restricting file operations.
 */
export type PathAccessConfig = {
  /**
   * Paths the agent is allowed to access.
   * Supports ~ expansion for home directory.
   * @example ["~/.cml-hive-assist/workspace", "/tmp/cml-hive-assist"]
   */
  allowPaths?: string[];

  /**
   * Paths the agent is explicitly denied access to.
   * Deny rules take precedence over allow rules.
   * Supports ~ expansion for home directory.
   * @example ["~/.ssh", "~/.aws", "~/.config", "~/.gnupg", "/etc", "/usr", "/bin"]
   */
  denyPaths?: string[];
};

/**
 * Command execution restrictions.
 *
 * Defines patterns of commands that should be blocked from execution.
 */
export type CommandRestrictionConfig = {
  /**
   * Regex patterns for commands that should be blocked.
   * Matching any pattern will prevent command execution.
   * @example ["rm -rf /", "curl.*\\|.*bash", "sudo"]
   */
  deniedPatterns?: string[];

  /**
   * Commands that are explicitly allowed even if they match denied patterns.
   * Use with caution.
   */
  allowedCommands?: string[];
};

/**
 * Rate limiting configuration for the gateway.
 */
export type RateLimitConfig = {
  /** Enable rate limiting. */
  enabled?: boolean;

  /** Maximum requests allowed within the window. */
  maxRequests?: number;

  /** Time window in milliseconds. */
  windowMs?: number;

  /** Delay between requests in milliseconds. */
  delayMs?: number;

  /** Skip rate limiting for specific IP addresses. */
  skipIps?: string[];
};

/**
 * Audit logging configuration.
 *
 * Enables detailed logging of security-relevant operations.
 */
export type AuditLoggingConfig = {
  /** Enable audit logging for tool invocations. */
  auditTools?: boolean;

  /** Enable audit logging for file operations. */
  auditFileOps?: boolean;

  /** Enable audit logging for message handling. */
  auditMessages?: boolean;

  /** Enable audit logging for authentication events. */
  auditAuth?: boolean;

  /** Enable audit logging for command execution. */
  auditCommands?: boolean;

  /** Path for audit log output (separate from main logs). */
  auditLogPath?: string;
};

/**
 * Security hardening options for sandbox configuration.
 *
 * Extends the existing sandbox configuration with additional security options.
 */
export type SandboxSecurityConfig = {
  /** Path-based access controls within the sandbox. */
  pathAccess?: PathAccessConfig;

  /** Command execution restrictions within the sandbox. */
  commandRestrictions?: CommandRestrictionConfig;

  /** Disable network access (sets docker network to "none"). */
  noNetwork?: boolean;

  /** Run container as non-root user. */
  nonRoot?: boolean;

  /** Drop all Linux capabilities. */
  dropAllCapabilities?: boolean;

  /** Enable read-only root filesystem. */
  readOnlyRoot?: boolean;

  /** Resource limits for the sandbox container. */
  resourceLimits?: {
    /** Maximum memory (e.g., "512m", "1g"). */
    memory?: string;
    /** Maximum CPU shares (e.g., 0.5, 1, 2). */
    cpus?: number;
    /** Maximum number of processes. */
    pidsLimit?: number;
    /** Maximum open files (nofile ulimit). */
    maxOpenFiles?: number;
  };
};

/**
 * Prompt injection defense configuration.
 *
 * Settings to help defend against prompt injection attacks.
 */
export type PromptInjectionDefenseConfig = {
  /**
   * Enable strict mode which treats all external content as untrusted.
   * This adds additional validation and confirmation prompts.
   */
  strictMode?: boolean;

  /**
   * Require confirmation before executing commands with external input.
   */
  confirmExternalCommands?: boolean;

  /**
   * Require confirmation before accessing URLs from message content.
   */
  confirmExternalUrls?: boolean;

  /**
   * List of domains that are trusted for URL access without confirmation.
   */
  trustedDomains?: string[];

  /**
   * Enable detection of common prompt injection patterns.
   */
  detectInjectionPatterns?: boolean;
};

/**
 * Complete security configuration type.
 *
 * This aggregates all security-related configuration options.
 */
export type SecurityConfig = {
  /** Path-based access controls. */
  pathAccess?: PathAccessConfig;

  /** Command execution restrictions. */
  commandRestrictions?: CommandRestrictionConfig;

  /** Rate limiting configuration. */
  rateLimit?: RateLimitConfig;

  /** Audit logging configuration. */
  auditLogging?: AuditLoggingConfig;

  /** Sandbox security options. */
  sandbox?: SandboxSecurityConfig;

  /** Prompt injection defense options. */
  promptInjectionDefense?: PromptInjectionDefenseConfig;
};

/**
 * Security audit result type.
 *
 * Returned by the security audit skill/command.
 */
export type SecurityAuditResult = {
  /** Overall security score (0-100). */
  score: number;

  /** Security level assessment. */
  level: "critical" | "warning" | "good" | "excellent";

  /** List of security issues found. */
  issues: SecurityAuditIssue[];

  /** List of security recommendations. */
  recommendations: string[];

  /** Timestamp of the audit. */
  timestamp: string;
};

/**
 * Individual security audit issue.
 */
export type SecurityAuditIssue = {
  /** Issue severity. */
  severity: "critical" | "high" | "medium" | "low" | "info";

  /** Configuration path where the issue was found. */
  path: string;

  /** Description of the issue. */
  message: string;

  /** Suggested fix for the issue. */
  fix?: string;
};
