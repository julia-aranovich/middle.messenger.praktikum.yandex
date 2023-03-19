import BaseAPI from "./BaseAPI";
import {User} from "./AuthAPI";

export interface UpdateProfileData {
  "first_name": string,
  "second_name": string,
  "display_name": string,
  "login": string,
  "email": string,
  "phone": string
}

export interface UpdatePasswordData {
  "oldPassword": string,
  "newPassword": string
}

export interface FindUserData {
  "login": string
}

export class UserAPI extends BaseAPI {
  constructor() {
    super("/user");
  }

  update(data: UpdateProfileData): Promise<User> {
    return this.http.put("/profile", data);
  }

  updateAvatar(formData: FormData) {
    return this.http.put("/profile/avatar", formData);
  }

  updatePassword(data: UpdatePasswordData) {
    return this.http.put("/password", data);
  }

  findUser(data: FindUserData): Promise<User[]> {
    return this.http.post("/search", data);
  }

  create = undefined;

  read = undefined;

  delete = undefined;
}

export default new UserAPI();
