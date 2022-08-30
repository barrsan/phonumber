import { phoneTable, regexp } from './constants';
import { ApplyResolversParams, ResolverResult } from './types';

const { REGEXP_ONLY_DIGITS } = regexp;

const applyResolvers = ({
  value,
  resolvers,
}: ApplyResolversParams): ResolverResult => {
  const firstPhoneNumber = +value.charAt(0);

  let resolvedCell = null;
  let resolvedPhone = value;

  const resolver = resolvers.find((i) => i.firstInputChars[firstPhoneNumber]);

  if (resolver) {
    const { resolveAs } = resolver;
    const row = phoneTable[resolveAs.firstChar];

    resolvedCell =
      row.find((i) => i.countries.find((c) => c.code === resolveAs.code)) ||
      null;

    const country = resolvedCell
      ? resolvedCell.countries.find((i) => i.code === resolveAs.code)
      : null;

    const dialCode = country
      ? country.dialCode.replace(REGEXP_ONLY_DIGITS, '')
      : null;

    const options = resolver.firstInputChars[firstPhoneNumber];

    if (options?.mode === 'add') {
      resolvedPhone = `${dialCode || resolveAs.firstChar}${resolvedPhone}`;
    }

    if (options?.mode === 'replace') {
      resolvedPhone = `${
        dialCode || resolveAs.firstChar
      }${resolvedPhone.substring(1)}`;
    }
  }

  return {
    resolvedCell,
    resolvedPhone,
  };
};

export default applyResolvers;
