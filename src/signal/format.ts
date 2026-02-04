// Stub file - Signal channel removed

export type SignalTextStyleRange = {
  start: number;
  length: number;
  style: string;
};

export function markdownToSignalTextChunks(
  _text: string,
  _maxLength?: number,
): Array<{ text: string; styles?: SignalTextStyleRange[] }> {
  return [];
}
