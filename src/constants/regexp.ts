const REGEXP_MASK_SYMBOLS = /\(|\)|\s|-|\+/g;
const REGEXP_CLEANED_MASK = /[^\\(\\)\s-#]/g;
const REGEXP_ALL_HASHES = /#/g;
const REGEXP_ONLY_DIGITS = /\D/g;

export default {
  REGEXP_ALL_HASHES,
  REGEXP_ONLY_DIGITS,
  REGEXP_MASK_SYMBOLS,
  REGEXP_CLEANED_MASK,
};