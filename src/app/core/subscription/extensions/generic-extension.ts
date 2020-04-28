export interface GenericExtension {
  // INTERNET
  uploadSpeed?: number;
  downloadSpeed?: number;
  isFibra?: boolean;

  // MOBILE
  gbQuantity?: number;
  hasUnlimitedInternetApp?: boolean;
  unlimitedCallsBrasil?: boolean;

  // PHONE
  unlimitedPhoneCalls?: boolean;
  unlimitedMobileCalls?: boolean;
  allOperators?: boolean;

  // TELEVISION
  channelCount?: number;
  deviceCount?: number;
}
