export const lengthOptions = {
  short: { minWords: 40, maxWords: 90 },
  medium: { minWords: 125, maxWords: 200 },
  long: { minWords: 255, maxWords: 400 }
} as const;

export type WordCountOption = keyof typeof lengthOptions;