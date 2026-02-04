// Stub file - LINE channel removed

export type LineConfig = {
  enabled?: boolean;
  accounts?: Record<string, LineAccountConfig>;
};

export type LineAccountConfig = {
  enabled?: boolean;
  channelSecret?: string;
  accessToken?: string;
};

export type ResolvedLineAccount = {
  accountId: string;
  config: LineAccountConfig;
};

export type LineChannelData = {
  channelId?: string;
  channelSecret?: string;
  accessToken?: string;
};
