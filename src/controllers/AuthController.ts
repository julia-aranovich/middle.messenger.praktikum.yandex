import API, {AuthAPI, SigninData, SignupData} from "../api/AuthAPI";
import router, {Routes} from "../utils/navigation";
import store from "../utils/storage";
import MessagesController from "./MessagesController";
import {ErrorWithReason} from "../utils/types";

class AuthController {
  private readonly _api: AuthAPI;

  constructor() {
    this._api = API;
  }

  async signup(data: SignupData) {
    store.set("user.error", undefined);
    try {
      await this._api.signup(data);
      await this.fetchUser();
      router.go(Routes.MESSENGER);
    } catch (e: unknown) {
      store.set("user.error", (e as ErrorWithReason).reason);
    }
  }

  async signin(data: SigninData) {
    store.set("user.error", undefined);
    try {
      await this._api.signin(data);
      await this.fetchUser();
      router.go(Routes.MESSENGER);
    } catch (e: unknown) {
      store.set("user.error", (e as ErrorWithReason).reason);
    }
  }

  async logout() {
    try {
      store.set("user.error", undefined);
      MessagesController.closeAll();
      await this._api.logout();
      store.set("user", undefined);
      store.set("chats", undefined);
      router.go(Routes.LOGIN_PAGE);
    } catch (e: unknown) {
      store.set("user.error", (e as ErrorWithReason).reason);
    }
  }

  async fetchUser() {
    try {
      store.set("user.isLoading", true);
      const user = await this._api.read();
      store.set("user.data", user);
      store.set("user.isLoading", false);
    } catch (e: unknown) {
      store.set("user.error", undefined);
    }
  }
}

export default new AuthController();
