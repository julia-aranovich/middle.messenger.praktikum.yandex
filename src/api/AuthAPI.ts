import BaseAPI from "./BaseAPI";

export interface SignupData {
  "first_name": string,
  "second_name": string,
  "login": string,
  "email": string,
  "password": string,
  "phone": string
}

export interface SigninData {
  "login": string,
  "password": string
}

export interface User {
  "id": number,
  "first_name": string,
  "second_name": string,
  "display_name": string,
  "login": string,
  "email": string,
  "phone": string,
  "avatar": string,
  "role"?: string
}

export class AuthAPI extends BaseAPI {
  constructor() {
    super("/auth");
  }

  signup(data: SignupData) {
    return this.http.post("/signup", data);
  }

  signin(data: SigninData) {
    return this.http.post("/signin", data);
  }

  logout() {
    return this.http.post("/logout");
  }

  read(): Promise<User> {
    return this.http.get("/user");
  }

  create = undefined;

  update = undefined;

  delete = undefined;
}

export default new AuthAPI();
