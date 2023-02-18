import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import ProfilePage from "../pages/ProfilePage";
import UpdateProfilePage from "../pages/UpdateProfilePage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import ChatListPage from "../pages/ChatListPage";
import ChatPage from "../pages/ChatPage";
import ServerErrorPage from "../pages/ServerErrorPage";
import NotFoundPage from "../pages/NotFoundPage";

import {Props} from "../types";

import {CHAT_LIST_DATA, CHAT_PAGE_DATA, PROFILE} from "./data";
import {
  CHANGE_PASSWORD_PAGE,
  CHAT_LIST_PAGE,
  CHAT_PAGE,
  LOGIN_PAGE,
  NOT_FOUND_PAGE,
  PROFILE_PAGE,
  REGISTRATION_PAGE,
  SERVER_ERROR_PAGE,
  UPDATE_PROFILE_PAGE
} from "./routes";

const ROUTE_PAGES = {
  [LOGIN_PAGE]: LoginPage,
  [REGISTRATION_PAGE]: RegistrationPage,
  [PROFILE_PAGE]: ProfilePage,
  [UPDATE_PROFILE_PAGE]: UpdateProfilePage,
  [CHANGE_PASSWORD_PAGE]: ChangePasswordPage,
  [CHAT_LIST_PAGE]: ChatListPage,
  [CHAT_PAGE]: ChatPage,
  [SERVER_ERROR_PAGE]: ServerErrorPage,
  [NOT_FOUND_PAGE]: NotFoundPage
};

const CONTEXTS: Props = {
  [PROFILE_PAGE]: PROFILE,
  [UPDATE_PROFILE_PAGE]: PROFILE,
  [CHANGE_PASSWORD_PAGE]: PROFILE,
  [CHAT_LIST_PAGE]: CHAT_LIST_DATA,
  [CHAT_PAGE]: CHAT_PAGE_DATA
};

export default function renderPage(route?: keyof typeof ROUTE_PAGES): HTMLElement {
  const root = document.querySelector("#root") as HTMLElement;
  root.innerHTML = "";
  const PageComponent = ROUTE_PAGES[route || LOGIN_PAGE];
  const page = new PageComponent((route && CONTEXTS[route]) || {});
  root.appendChild(page.getContent());
  page.dispatchComponentDidMount();
  return root;
}
