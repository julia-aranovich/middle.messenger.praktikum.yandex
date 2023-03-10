import BaseAPI from "./BaseAPI";
import {User} from "./AuthAPI";

export interface ChatInfo {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: User,
    time: string;
    content: string;
  }
}

export class ChatsAPI extends BaseAPI {
  constructor() {
    super("/chats");
  }

  read(data?: Record<string, string | number>): Promise<ChatInfo[]> {
    return this.http.get("/", data);
  }

  create(title: string) {
    return this.http.post("/", {title});
  }

  delete(id: number): Promise<unknown> {
    return this.http.delete("/", {chatId: id});
  }

  getUsers(id: number): Promise<User[]> {
    return this.http.get(`/${id}/users`);
  }

  addUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.put("/users", {chatId: id, users});
  }

  deleteUsers(id: number, users: number[]) {
    return this.http.delete("/users", {chatId: id, users});
  }

  updateAvatar(formData: FormData) {
    return this.http.put("/avatar", formData);
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post<{token: string}>(`/token/${id}`);
    return response.token;
  }

  update = undefined;
}

export default new ChatsAPI();
