export const PROFILE = {
  email: "example@yandex.ru",
  login: "example_login",
  display_name: "JA",
  first_name: "Юлия",
  second_name: "Аранович",
  phone: "11111111111",
};

const CHATS = [
  {
    title: "Класс Анны Ивановой",
    unread: 4,
    last_updated: "1ч назад",
    members_count: 45,
  }, {
    title: "Одноклассники (уч-ль Иванова)",
    unread: 1,
    last_updated: "2ч назад",
  }, {
    title: "Павел Иванов",
    last_updated: "3ч назад",
  }, {
    title: "Младшая группа д/с",
    last_updated: "6ч назад",
  }, {
    title: "Ольга",
    last_updated: "1д назад",
  }, {
    title: "just_login",
    last_updated: "1д назад",
  }, {
    title: "Test Bot",
    last_updated: "3д назад",
  },
];

const SEARCH = "Иванов";

const MESSAGES = [
  {
    author: "Анна",
    text: "Привет! Ты получила мое последнее сообщение?",
    created_at: "19:46",
  }, {
    author: "Ольга",
    text: "",
    created_at: "19:47",
    img: "img_placeholder.png",
  }, {
    author: "me",
    text: "Привет! Да, конечно) Очень крутое фото!",
    created_at: "19:48",
    my: true,
  },
];

export const CHAT_LIST_DATA = {
  chats: CHATS,
};

export const CHAT_PAGE_DATA = {
  chats: CHATS.slice(0, 3),
  chat: CHATS[0],
  search: SEARCH,
  messages: MESSAGES,
};
