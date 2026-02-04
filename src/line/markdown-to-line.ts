// Stub file - LINE channel removed

export type ProcessedLineMessage = {
  text: string;
  type: string;
};

export function processLineMessage(_text: string): ProcessedLineMessage {
  return { text: "", type: "text" };
}

export function hasMarkdownToConvert(_text: string): boolean {
  return false;
}

export function stripMarkdown(_text: string): string {
  return _text;
}
