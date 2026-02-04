/**
 * Discord allow-list stub - channel has been removed
 */

export function normalizeDiscordSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
