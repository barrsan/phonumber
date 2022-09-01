# Phonumber

Phonumber - it is phone number parser. Good for formatting phone numbers entered by users.

## Example

[CodeSandbox Demo](https://codesandbox.io/s/phonumber-with-react-example-j9ps51)

## Installation

```bash
npm i phonumber
```

## Usage

```javascript

import { parsePhoneNumber } from 'phonumber';

const result = parsePhoneNumber('12089999999');

/*

result = {
  code: 'US',
  dialCode: '+1',
  nationalNumber: '2089999999',
  formattedNumber: '+1 2089999999',
}

*/

```

## Config

### Resolvers

You can tell the parser how to resolve the value passed to it.

**resolvers** - it is an array contains objects with the following properties:

| Property | Type | Description|
|---|---|---|
| **firstInputChars** | Object (required) | It is an object where keys are first input char sended to parser and values are object which contains resolver options for this char. |
| **resolveAs** | Object (required) | Data whitch detect how resolve first input char. |

#### firstInputChars

| Property | Type | Description|
|---|---|---|
| **mode** | "add" \| "replace" (required) | **"Replace"** mode replaces first input char with the dial code.<br /> **"Add"** mode puts the dial code before this first input char. The dial code is determined based on data from "resolveAs". |

#### resolveAs

| Property | Type | Description|
|---|---|---|
| **firstChar** | string (required) | The first digit of the country code |
| **code** | string (required) | Country code (US, RU, ...) |

```javascript

const resolvers = [
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

const result1 = parsePhoneNumber('89191238899', {
  resolvers,
});

const result2 = parsePhoneNumber('9191238899', {
  resolvers,
});

/*

result1 = {
  code: 'RU',
  dialCode: '+7',
  nationalNumber: '9191238899',
  formattedNumber: '+7 9191238899',
}

result2 = {
  code: 'RU',
  dialCode: '+7',
  nationalNumber: '9191238899',
  formattedNumber: '+7 9191238899',
}

*/

```

### Formats

**Formats** - it is an object where keys are country codes and values are objects with the following properties:

| Property | Type | Description|
|---|---|---|
| **mask** | string | Mask for the entered number without a dial code. The dial code will be filled automatically. |
| **withTail** | boolean | Add numbers that are not counted in the mask to the phone number. |

```javascript

const formats = {
    RU: {
      mask: '(###) ### ####',
    },
    BY: {
      mask: '## ### ## ##',
    },
    US: {
      mask: '###-###-####',
      withTail: true,
    },
  };

const result = parsePhoneNumber('12089999999', {
  formats,
});

/*

result = {
  code: 'US',
  dialCode: '+1',
  nationalNumber: '2089999999',
  formattedNumber: '+1 208-999-9999',
}

*/
