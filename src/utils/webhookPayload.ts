import { WordCountOption, lengthOptions } from '@/constants/wordCount';

export const createWebhookPayload = (
  contentToProcess: string,
  dropdownValue: WordCountOption
) => {
  return {
    contentType: "article",
    selectedLength: dropdownValue,
    lengthConstraints: lengthOptions[dropdownValue],
    originalContent: contentToProcess
  };
};