import router, {Routes} from "./utils/navigation";

import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import Messenger from "./pages/Messenger";
import EditChatPage from "./pages/EditChatPage";
import ServerErrorPage from "./pages/ServerErrorPage";
import NotFoundPage from "./pages/NotFoundPage";

import AuthController from "./controllers/AuthController";
import store from "./utils/storage";

window.addEventListener("DOMContentLoaded", async () => {
  router
    .use(Routes.LOGIN_PAGE, LoginPage)
    .use(Routes.REGISTRATION_PAGE, RegistrationPage)
    .use(Routes.PROFILE_PAGE, ProfilePage)
    .use(Routes.UPDATE_PROFILE_PAGE, UpdateProfilePage)
    .use(Routes.CHANGE_PASSWORD_PAGE, ChangePasswordPage)
    .use(Routes.MESSENGER, Messenger)
    .use(Routes.EDIT_CHAT_PAGE, EditChatPage)
    .use(Routes.SERVER_ERROR_PAGE, ServerErrorPage)
    .use(Routes.NOT_FOUND_PAGE, NotFoundPage);

  let isProtectedRoute;
  switch (window.location.pathname) {
    case Routes.LOGIN_PAGE:
    case Routes.REGISTRATION_PAGE:
      isProtectedRoute = false;
      break;
    default:
      isProtectedRoute = true;
      break;
  }

  try {
    await AuthController.fetchUser();
    if (!store.getState().user!.data) {
      throw Error("Пользователь не авторизован");
    }
    router.start();
    if (!isProtectedRoute) {
      router.go(Routes.MESSENGER);
    }
    if (window.location.pathname === Routes.EDIT_CHAT_PAGE && !store.getState().selectedChatId) {
      router.go(Routes.MESSENGER);
    }
  } catch (e) {
    router.start();
    if (isProtectedRoute) {
      router.go(Routes.LOGIN_PAGE);
    }
  }
});
