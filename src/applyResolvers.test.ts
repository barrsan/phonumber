import applyResolvers from './applyResolvers';
import { Resolver } from './types';

describe('applyResolvers tests', () => {
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

  const resolvedCell = {
    secondNumbers: [0, 1, 2, 3, 4, 5, 8, 9],
    countries: [
      {
        code: 'RU',
        dialCode: '+7',
      },
    ],
  };

  test('Should get resolved data without replace input value', () => {
    const result = applyResolvers({ value: '917', resolvers });

    expect(result).toEqual({
      resolvedCell,
      resolvedPhone: '7917',
    });
  });

  test('Should get resolved data with replace input value', () => {
    const result = applyResolvers({ value: '8917', resolvers });

    expect(result).toEqual({
      resolvedCell,
      resolvedPhone: '7917',
    });
  });

  test('Should not apply resolver', () => {
    const result = applyResolvers({ value: '7917', resolvers });

    expect(result).toEqual({
      resolvedCell: null,
      resolvedPhone: '7917',
    });
  });
});
