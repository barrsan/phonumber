import parsePhoneNumber from './phoneNumberParser';
import { Formats, Resolver } from './types';

describe('Parser tests', () => {
  const phone = {
    code: 'RU',
    dialCode: '+7',
    nationalNumber: '9199881234',
    formattedNumber: '+7 9199881234',
  };

  const unknownPhone = {
    code: null,
    dialCode: null,
    nationalNumber: null,
    formattedNumber: '+',
  };

  const resolvers: Array<Resolver> = [
    {
      firstInputChars: {
        8: {
          mode: 'replace',
        },
        9: {
          mode: 'add',
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
  };

  test('Should get parsed phone number', () => {
    const result = parsePhoneNumber('79199881234');
    expect(result).toEqual(phone);
  });

  test('Should get parsed phone number from the string starting with a "+"', () => {
    const result = parsePhoneNumber('+79199881234');
    expect(result).toEqual(phone);
  });

  test('Should get parsed phone number from the string contained non digits', () => {
    const result = parsePhoneNumber(' +7 ( 91$9 ) 98as8 - 1234 ');
    expect(result).toEqual(phone);
  });

  test('Should detect UK', () => {
    const result = parsePhoneNumber('44323');
    expect(result.code).toBe('UK');
    expect(result.dialCode).toBe('+44');
    expect(result.nationalNumber).toBe('323');
    expect(result.formattedNumber).toBe('+44 323');
  });

  test('Should get unknown phone number', () => {
    const expectedResult = { ...unknownPhone };
    expectedResult.formattedNumber = '+800555';

    const result = parsePhoneNumber('800 555');
    expect(result).toEqual(expectedResult);
  });

  test('Should get unknown phone number if pass empty string', () => {
    const result = parsePhoneNumber('');
    expect(result).toEqual(unknownPhone);
  });

  test('Should get phone number and use resolvers', () => {
    const result = parsePhoneNumber('89199881234', { resolvers });
    expect(result).toEqual(phone);
  });

  test('Should get phone number and use formats', () => {
    const expectedResult = { ...phone };
    expectedResult.formattedNumber = '+7 (919) 988 1234';

    const result = parsePhoneNumber('79199881234', { formats });
    expect(result).toEqual(expectedResult);
  });

  test('Should get phone number and use formats and resolvers', () => {
    const expectedResult = { ...phone };
    expectedResult.formattedNumber = '+7 (919) 988 1234';

    const result = parsePhoneNumber('89199881234', { resolvers, formats });
    expect(result).toEqual(expectedResult);
  });
});
