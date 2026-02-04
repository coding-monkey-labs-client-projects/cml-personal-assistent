// Stub file - Signal channel removed

export function sendMessageSignal(): Promise<{ ok: false; error: string }> {
  return Promise.resolve({ ok: false, error: "Signal channel removed" });
}
