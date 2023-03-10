import {
  CHANGE_PASSWORD_PAGE, LOGIN_PAGE, PROFILE_PAGE, REGISTRATION_PAGE
} from "./routes";

const REGEXES = {
  email: "(.+)@(.+){2,}\\.(.+){2,}",
  login: "^[a-zA-Z0-9\\-\\_]{6,16}$",
  display_name: "^[a-zA-Zа-яА-Я0-9\\-\\_]+$",
  name: "^[a-zA-Zа-яА-Я\\-]+$",
  phone: "^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\\s\\./0-9]*$",
  password: "^[a-zA-Z0-9\\-\\_]{6,16}$"
};

const REGEX_ERRORS = {
  email: "Введите коректный e-mail",
  login: "Допускаются только латинские буквы, цифры, знаки - и _ (от 6 до 16 символов).",
  display_name: "Допускаются только буквы, цифры, знаки - и _.",
  name: "Допускаются только буквы, цифры, знак -.",
  phone: "Введите коректный номер телефона",
  password: "Допускаются только латинские буквы, цифры, знаки - и _ (от 6 до 16 символов)."
};

const EMAIL = {
  name: "email",
  label: "Email",
  mandatory: true,
  regex: REGEXES.email
};

const LOGIN = {
  name: "login",
  label: "Логин",
  mandatory: true,
  regex: REGEXES.login,
  error_text: REGEX_ERRORS.login
};

const DISPLAY_NAME = {
  name: "display_name",
  label: "Имя в чате",
  regex: REGEXES.display_name,
  error_text: REGEX_ERRORS.display_name
};

const FIRST_NAME = {
  name: "first_name",
  label: "Имя",
  regex: REGEXES.name,
  error_text: REGEX_ERRORS.name
};

const SECOND_NAME = {
  name: "second_name",
  label: "Фамилия",
  regex: REGEXES.name,
  error_text: REGEX_ERRORS.name
};

const PHONE = {
  name: "phone",
  label: "Телефон",
  regex: REGEXES.phone,
  error_text: REGEX_ERRORS.phone
};

const PASSWORD = {
  name: "password",
  type: "password",
  label: "Пароль",
  mandatory: true,
  regex: REGEXES.password,
  error_text: REGEX_ERRORS.password
};

const OLD_PASSWORD = {
  name: "oldPassword",
  type: "password",
  label: "Старый пароль",
  mandatory: true,
  regex: REGEXES.password,
  error_text: REGEX_ERRORS.password
};

const NEW_PASSWORD = {
  name: "newPassword",
  type: "password",
  label: "Новый пароль",
  mandatory: true,
  regex: REGEXES.password,
  error_text: REGEX_ERRORS.password
};

const REPEAT_PASSWORD = {
  name: "repeatPassword",
  type: "password",
  label: "Повторите пароль",
  mandatory: true,
  regex: REGEXES.password,
  error_text: REGEX_ERRORS.password
};

export const SEARCH = {
  name: "search",
  placeholder: "Поиск по чатам"
};

const PAGE_FIELDS = {
  [LOGIN_PAGE]: [
    LOGIN,
    PASSWORD
  ],
  [REGISTRATION_PAGE]: [
    EMAIL,
    LOGIN,
    FIRST_NAME,
    SECOND_NAME,
    PHONE,
    PASSWORD,
    REPEAT_PASSWORD
  ],
  [PROFILE_PAGE]: [
    EMAIL,
    LOGIN,
    DISPLAY_NAME,
    FIRST_NAME,
    SECOND_NAME,
    PHONE
  ],
  [CHANGE_PASSWORD_PAGE]: [
    OLD_PASSWORD,
    NEW_PASSWORD,
    REPEAT_PASSWORD
  ]
};

export default PAGE_FIELDS;
