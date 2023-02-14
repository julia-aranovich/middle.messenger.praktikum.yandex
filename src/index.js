import Handlebars from "handlebars/dist/handlebars.runtime";

import authPage from "./pages/auth_page.hbs";
import registrationPage from "./pages/registration_page.hbs";
import profilePage from "./pages/profile_page.hbs";
import profileEditPage from "./pages/profile_edit_page.hbs";
import passwordEditPage from "./pages/edit_password_page.hbs";
import changePhotoPage from "./pages/change_photo_modal.hbs";
import chatListPage from "./pages/chat_list_page.hbs";
import chatPage from "./pages/chat_page.hbs";
import serverErrorPage from "./pages/5xx_page.hbs";
import notFoundPage from "./pages/404_page.hbs";

import field from "./partials/field.hbs";
import submitButton from "./partials/submit_button.hbs";
import chatList from "./partials/chat_list.hbs";
import photoPreview from "./partials/photo_preview.hbs";

import {PROFILE, CHAT_LIST_DATA, CHAT_PAGE_DATA} from "./data";

// register partials
Handlebars.registerPartial("field", field);
Handlebars.registerPartial("submitButton", submitButton);
Handlebars.registerPartial("chatList", chatList);
Handlebars.registerPartial("photoPreview", photoPreview);

function render(html) {
  const app = document.querySelector("#root");
  app.innerHTML = html;
}

const PAGES = {
  authPage,
  registrationPage,
  profilePage,
  profileEditPage,
  passwordEditPage,
  changePhotoPage,
  chatListPage,
  chatPage,
  serverErrorPage,
  notFoundPage,
};

const CONTEXTS = {
  profilePage: PROFILE,
  profileEditPage: PROFILE,
  passwordEditPage: PROFILE,
  chatListPage: CHAT_LIST_DATA,
  chatPage: CHAT_PAGE_DATA,
};

// simulate router
window.goTo = (pageName) => {
  if (!PAGES[pageName]) {
    throw new Error(`Route ${pageName} not found`);
  }
  render(PAGES[pageName](CONTEXTS[pageName] || {}));
  return false;
};
window.addEventListener("DOMContentLoaded", () => {
  const html = authPage();
  render(html);
});
