import { parsePhoneNumber, Resolver, Formats } from '../main';

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

  input.onkeyup = (e) => {
    const target = <HTMLInputElement>e.target;
    const { value } = target;
    let result = null;

    result = parsePhoneNumber(value, {
      resolvers,
      formats,
    });

    input.value = result.formattedNumber;
    countryCode.innerHTML = result.code || '';

    // eslint-disable-next-line no-console
    console.log('🤙 => ', result);
  };
});
