import API, {UserAPI, UpdateProfileData, UpdatePasswordData} from "../api/UserAPI";
import router, {Routes} from "../utils/navigation";
import store from "../utils/storage";
import {ErrorWithReason} from "../utils/types";

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
    } catch (e: unknown) {
      store.set("user.error", (e as ErrorWithReason).reason);
    }
  }

  async updateAvatar(formData: FormData) {
    store.set("user.error", undefined);
    try {
      const user = await this._api.updateAvatar(formData);
      store.set("user.data", user);
    } catch (e: unknown) {
      store.set("user.error", (e as ErrorWithReason).reason);
    }
  }

  async updatePassword(data: UpdatePasswordData) {
    store.set("user.error", undefined);
    try {
      await this._api.updatePassword(data);
    } catch (e: unknown) {
      store.set("user.error", (e as ErrorWithReason).reason);
    }
  }

  async findUser(login: string) {
    store.set("userSearchResults", undefined);
    try {
      const users = await this._api.findUser({ login });
      store.set("userSearchResults", users);
    } catch (e: unknown) {
      store.set("error", (e as ErrorWithReason).reason);
    }
  }
}

export default new UserController();
