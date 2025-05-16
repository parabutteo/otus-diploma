export const REST_API_SERVER_URL = 'https://19429ba06ff2.vps.myjino.ru/api';
export const GRAPH_QL_SERVER = 'https://cea3c11a3f62.vps.myjino.ru/graphql';
export const COMMAND_ID = 'parabutteo';
export const ADMIN_ID = '68192170959ec5e015c5854e';

const existAccount = 'Уже существует пользователь с данным адресом электронной почты';
const enterCorrectEmail = 'Введите корректный адрес электронной почты';

export const backendErrorMessages: Record<string, string> = {
  ERR_VALIDATION_ERROR: enterCorrectEmail,
  VALIDATION: enterCorrectEmail,
  ERR_ACCOUNT_ALREADY_EXIST: existAccount,
  ACCOUNT_ALREADY_EXIST: existAccount,
  INCORRECT_EMAIL_OR_PASSWORD: 'Введен неправильный логин или пароль',
};

export const CATEGORY = {
  tshirt: '68192682959ec5e015c585a7',
  outware: '68192690959ec5e015c585ae',
  shoes: '68192696959ec5e015c585b5',
};

export const categoryMap: Record<string, string> = {
  'Верхняя одежда': 'outerwear',
  'Футболки, рубашки': 'tsirts',
  Обувь: 'shoes',
};
