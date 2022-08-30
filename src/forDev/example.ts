import { parsePhoneNumber } from '../main';
import { regexp } from '../constants';
import { Resolver, Formats } from '../types';

document.addEventListener('DOMContentLoaded', () => {
  const input = <HTMLInputElement>document.querySelector('[name=phone]');
  const countryCode = <HTMLDivElement>document.querySelector('#country');

  const resolvers: Array<Resolver> = [
    {
      firstInputChars: {
        9: {
          mode: 'add',
        },
        8: {
          mode: 'replace',
        },
      },
      resolveAs: {
        firstChar: 7,
        code: 'RU',
      },
    },
  ];

  const formats: Formats = {
    RU: {
      mask: '(###) ### ####',
    },
    AE: {
      mask: '#-###-####',
    },
    US: {
      mask: '###-###-####',
      withTail: true,
    },
  };

  let currentDialCode: string | null = null;

  input.onkeydown = (e) => {
    const target = <HTMLInputElement>e.target;
    const { value } = target;

    const prevChar = value.slice(
      target.selectionStart! - 1,
      target.selectionEnd!,
    );

    if (
      target.selectionStart === target.selectionEnd &&
      regexp.REGEXP_ONLY_DIGITS.test(prevChar) &&
      e.key === 'Backspace'
    ) {
      if (value === currentDialCode || value === '+') {
        input.value = '';
      } else {
        input.value = value.slice(0, value.length - 1);
      }
    }
  };

  input.onkeyup = (e) => {
    const target = <HTMLInputElement>e.target;
    const { value } = target;
    let result = null;

    if (value) {
      if ((value.length === 1 && value === '+') || value.startsWith('+')) {
        result = parsePhoneNumber(value, { formats });
      } else {
        result = parsePhoneNumber(value, {
          resolvers,
          formats,
        });
      }

      currentDialCode = result.dialCode;
      input.value = result.formattedNumber;
      countryCode.innerHTML = result.code || '';

      // eslint-disable-next-line no-console
      console.log('🤙 => ', result);
    }
  };
});
