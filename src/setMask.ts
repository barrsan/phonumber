import { regexp } from './constants';
import { SetMaskParams } from './types';

const {
  REGEXP_ALL_HASHES,
  REGEXP_MASK_SYMBOLS,
  REGEXP_CLEANED_MASK,
  REGEXP_ONLY_DIGITS,
} = regexp;

const setMask = ({ mask, value, options }: SetMaskParams) => {
  let i = 0;
  let tail = '';

  if (!value) {
    return '';
  }

  if (!mask) {
    return value;
  }

  const cleanedMask = mask.replace(REGEXP_CLEANED_MASK, '');

  if (options?.withTail) {
    const hashesLength = cleanedMask.replace(REGEXP_MASK_SYMBOLS, '').length;
    tail = value.slice(hashesLength, value.length);
  }

  const maskedData = cleanedMask.replace(REGEXP_ALL_HASHES, () => {
    const char = value[i];
    i += 1;

    if (char) {
      return char;
    }

    return '_';
  });

  const result = maskedData.split('_')[0].trim();

  return `${result}${tail}`.replace(REGEXP_ONLY_DIGITS, '');
};

export default setMask;
