// Stub file - LINE channel removed

export type CardAction = {
  type: string;
  label: string;
  data?: string;
  uri?: string;
};

export type ListItem = {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  action?: CardAction;
};

export function createInfoCard(): null {
  return null;
}

export function createListCard(): null {
  return null;
}

export function createImageCard(): null {
  return null;
}

export function createActionCard(): null {
  return null;
}

export function createReceiptCard(): null {
  return null;
}
