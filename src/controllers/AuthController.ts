import API, {AuthAPI, SigninData, SignupData} from "../api/AuthAPI";
import router, {Routes} from "../utils/Router";
import store from "../utils/Store";

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
    } catch (e: any) {
      store.set("user.error", e.reason);
    }
  }

  async signin(data: SigninData) {
    store.set("user.error", undefined);
    try {
      await this._api.signin(data);
      await this.fetchUser();
      router.go(Routes.MESSENGER);
    } catch (e: any) {
      store.set("user.error", e.reason);
    }
  }

  async logout() {
    try {
      store.set("user.error", undefined);
      await this._api.logout();
      store.set("user", undefined);
      router.go(Routes.LOGIN_PAGE);
    } catch (e: any) {
      store.set("user.error", e.reason);
    }
  }

  async fetchUser() {
    store.set("user.isLoading", true);
    const user = await this._api.read();
    store.set("user.data", user);
    store.set("user.isLoading", false);
  }
}

export default new AuthController();
