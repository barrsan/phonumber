import { phoneTable, regexp } from './constants';
import applyResolvers from './applyResolvers';
import setMask from './setMask';
import { ParserPhoneNumberResult, ParserPhoneNumberOptions } from './types';

const { REGEXP_ONLY_DIGITS } = regexp;

const parsePhoneNumber = (
  phone: string,
  options?: ParserPhoneNumberOptions,
): ParserPhoneNumberResult => {
  const resolvers = options?.resolvers;
  const formats = options?.formats;

  const cleanPhone = phone.trim().replace(REGEXP_ONLY_DIGITS, '');
  const secondChar = cleanPhone.length > 1 ? cleanPhone.charAt(1) : '';

  let firstChar = cleanPhone.length > 0 ? cleanPhone.charAt(0) : '';
  let currentCell = null;
  let currentPhone = cleanPhone;

  if (resolvers && firstChar) {
    const { resolvedCell, resolvedPhone } = applyResolvers({
      value: cleanPhone,
      resolvers,
    });
    currentCell = resolvedCell;
    currentPhone = resolvedPhone;
    firstChar = currentPhone.charAt(0);
  }

  const unknownPhone = {
    code: null,
    dialCode: null,
    nationalNumber: null,
    formattedNumber: `+${currentPhone}`,
  };

  if (firstChar && firstChar !== '0') {
    const secondCharNumber = secondChar === '' ? -1 : Number(secondChar);
    const cell =
      currentCell ||
      phoneTable[firstChar].find((i) =>
        i.secondNumbers.includes(secondCharNumber),
      );

    if (cell) {
      const dialCodeLength = cell ? cell.countries[0].dialCode.length - 1 : 0;
      const estimatedDialCode = currentPhone.slice(0, dialCodeLength);
      const targetCountries = cell.countries.filter((i) =>
        i.dialCode.includes(estimatedDialCode),
      );

      if (targetCountries.length > 1 || !targetCountries.length) {
        return unknownPhone;
      }

      const dialCodeWithoutPlus = targetCountries[0].dialCode.substring(1);

      const { dialCode, code } = targetCountries[0];
      const nationalNumber = currentPhone.substring(dialCodeWithoutPlus.length);

      const formatOptions = formats ? formats[code] : null;

      const formattedNumber = `${dialCode} ${setMask({
        value: nationalNumber,
        mask: formatOptions?.mask,
        options: {
          withTail: !!formatOptions?.withTail,
        },
      })}`.trim();

      return {
        code,
        dialCode,
        nationalNumber,
        formattedNumber,
      };
    }
  }

  return unknownPhone;
};

export default parsePhoneNumber;
