import Router from "./utils/Router";
import Routes from "./utils/routes";
import {CHAT_LIST_DATA, CHAT_PAGE_DATA, PROFILE} from "./utils/data";

import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ChatListPage from "./pages/ChatListPage";
import ChatPage from "./pages/ChatPage";
import ServerErrorPage from "./pages/ServerErrorPage";
import NotFoundPage from "./pages/NotFoundPage";

window.addEventListener("DOMContentLoaded", (): void => {
  Router
    .use(Routes.LOGIN_PAGE, LoginPage)
    .use(Routes.REGISTRATION_PAGE, RegistrationPage)
    .use(Routes.PROFILE_PAGE, ProfilePage, PROFILE)
    .use(Routes.UPDATE_PROFILE_PAGE, UpdateProfilePage, PROFILE)
    .use(Routes.CHANGE_PASSWORD_PAGE, ChangePasswordPage, PROFILE)
    .use(Routes.CHAT_LIST_PAGE, ChatListPage, CHAT_LIST_DATA)
    .use(Routes.CHAT_PAGE, ChatPage, CHAT_PAGE_DATA)
    .use(Routes.SERVER_ERROR_PAGE, ServerErrorPage)
    .use(Routes.NOT_FOUND_PAGE, NotFoundPage)
    .start();
});
