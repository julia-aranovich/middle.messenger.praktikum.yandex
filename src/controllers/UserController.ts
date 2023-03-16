import API, {UserAPI, UpdateProfileData, UpdatePasswordData} from "../api/UserAPI";
import router, {Routes} from "../utils/navigation";
import store from "../utils/storage";

class UserController {
  private readonly _api: UserAPI;

  constructor() {
    this._api = API;
  }

  async updateProfile(data: UpdateProfileData) {
    store.set("user.error", undefined);
    try {
      const user = await this._api.update(data);
      store.set("user.data", user);
      router.go(Routes.PROFILE_PAGE);
    } catch (e: any) {
      store.set("user.error", e.reason);
    }
  }

  async updateAvatar(formData: FormData) {
    store.set("user.error", undefined);
    try {
      const user = await this._api.updateAvatar(formData);
      store.set("user.data", user);
    } catch (e: any) {
      store.set("user.error", e.reason);
    }
  }

  async updatePassword(data: UpdatePasswordData) {
    store.set("user.error", undefined);
    try {
      await this._api.updatePassword(data);
    } catch (e: any) {
      store.set("user.error", e.reason);
    }
  }

  async findUser(login: string) {
    store.set("userSearchResults", undefined);
    const users = await this._api.findUser({login});
    store.set("userSearchResults", users);
  }
}

export default new UserController();
