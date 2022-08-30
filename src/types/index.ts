export type ParserPhoneNumberOptions = {
  resolvers?: Array<Resolver>;
  formats?: Formats;
};

export type SetMaskParams = {
  value: string;
  mask?: string;
  options?: MaskOptions;
};

export type ApplyResolversParams = {
  value: string;
  resolvers: Array<Resolver>;
};

export type ParserPhoneNumberResult = {
  code: string | null;
  dialCode: string | null;
  nationalNumber: string | null;
  formattedNumber: string;
};

export type Formats = Partial<Record<CountryCode, Format>>;

export type Format = {
  mask?: string;
} & MaskOptions;

export type MaskOptions = {
  withTail?: boolean;
};

export type Resolver = {
  firstInputChars: Record<number, ResolverOption>;
  resolveAs: ResolverTarget;
};

export type ResolverOption = {
  mode: ResolverMode;
};

type ResolverMode = 'add' | 'replace';

export type ResolverTarget = {
  firstChar: number;
  code: CountryCode;
};

export type ResolverResult = {
  resolvedCell: PhoneTableCell | null;
  resolvedPhone: string;
};

export type PhoneTable = {
  [key: string]: Array<PhoneTableCell>;
};

export type PhoneTableCell = {
  secondNumbers: Array<number>;
  countries: Array<Country>;
};

export type Country = {
  code: CountryCode;
  dialCode: string;
};

type CountryCode =
  | 'US'
  | 'EG'
  | 'SS'
  | 'MA'
  | 'DZ'
  | 'TN'
  | 'LY'
  | 'GM'
  | 'SN'
  | 'MR'
  | 'ML'
  | 'GN'
  | 'CI'
  | 'BF'
  | 'NE'
  | 'TG'
  | 'BJ'
  | 'MU'
  | 'LR'
  | 'SL'
  | 'GH'
  | 'NG'
  | 'TD'
  | 'CF'
  | 'CM'
  | 'CV'
  | 'ST'
  | 'GQ'
  | 'GA'
  | 'CG'
  | 'CD'
  | 'AO'
  | 'GW'
  | 'IO'
  | 'AC'
  | 'SC'
  | 'SD'
  | 'RW'
  | 'ET'
  | 'SO'
  | 'DJ'
  | 'KE'
  | 'TZ'
  | 'UG'
  | 'BI'
  | 'MZ'
  | 'ZM'
  | 'MG'
  | 'RE'
  | 'ZW'
  | 'NA'
  | 'MW'
  | 'LS'
  | 'BW'
  | 'SZ'
  | 'KM'
  | 'ZA'
  | 'SH'
  | 'ER'
  | 'AW'
  | 'FO'
  | 'GL'
  | 'GR'
  | 'NL'
  | 'BE'
  | 'FR'
  | 'ES'
  | 'GI'
  | 'PT'
  | 'LU'
  | 'IE'
  | 'IS'
  | 'AL'
  | 'MT'
  | 'CY'
  | 'FI'
  | 'BG'
  | 'HU'
  | 'LT'
  | 'LV'
  | 'EE'
  | 'MD'
  | 'AM'
  | 'BY'
  | 'AD'
  | 'MC'
  | 'SM'
  | 'VA'
  | 'UA'
  | 'RS'
  | 'ME'
  | 'XK'
  | 'HR'
  | 'SI'
  | 'BA'
  | 'EU'
  | 'MK'
  | 'IT'
  | 'RO'
  | 'CH'
  | 'CZ'
  | 'SK'
  | 'LI'
  | 'AT'
  | 'UK'
  | 'DK'
  | 'SE'
  | 'NO'
  | 'PL'
  | 'DE'
  | 'FK'
  | 'BZ'
  | 'GT'
  | 'SV'
  | 'HN'
  | 'NI'
  | 'CR'
  | 'PA'
  | 'PM'
  | 'HT'
  | 'PE'
  | 'MX'
  | 'CU'
  | 'AR'
  | 'BR'
  | 'CL'
  | 'CO'
  | 'VE'
  | 'FK'
  | 'BZ'
  | 'GT'
  | 'SV'
  | 'HN'
  | 'NI'
  | 'CR'
  | 'PA'
  | 'PM'
  | 'HT'
  | 'MY'
  | 'AU'
  | 'ID'
  | 'PH'
  | 'NZ'
  | 'SG'
  | 'TH'
  | 'TL'
  | 'AQ'
  | 'BN'
  | 'NR'
  | 'PG'
  | 'TO'
  | 'SB'
  | 'VU'
  | 'FJ'
  | 'PW'
  | 'WF'
  | 'CK'
  | 'NU'
  | 'WS'
  | 'KI'
  | 'NC'
  | 'TV'
  | 'PF'
  | 'TK'
  | 'FM'
  | 'MH'
  | 'KZ'
  | 'RU'
  | 'JP'
  | 'KR'
  | 'VN'
  | 'KP'
  | 'HK'
  | 'MO'
  | 'KH'
  | 'LA'
  | 'CN'
  | 'BD'
  | 'TW'
  | 'TR'
  | 'IN'
  | 'PK'
  | 'AF'
  | 'LK'
  | 'MM'
  | 'MV'
  | 'LB'
  | 'JO'
  | 'SY'
  | 'IQ'
  | 'KW'
  | 'SA'
  | 'YE'
  | 'OM'
  | 'PS'
  | 'AE'
  | 'IL'
  | 'BH'
  | 'QA'
  | 'BT'
  | 'MN'
  | 'NP'
  | 'IR'
  | 'TJ'
  | 'TM'
  | 'AZ'
  | 'GE'
  | 'KG'
  | 'UZ';
