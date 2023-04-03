import API, {ChatsAPI, ChatInfo} from "../api/ChatsAPI";
import router, {Routes} from "../utils/navigation";
import store from "../utils/storage";
import MessagesController from "./MessagesController";
import {ErrorWithReason} from "../utils/types";

export default class ChatController {
  private readonly _api: ChatsAPI;

  constructor() {
    this._api = API;
  }

  async createChat(title: string) {
    try {
      await this._api.create(title);
      await this.fetchChats();
    } catch (e: unknown) {
      store.set("error", (e as ErrorWithReason).reason);
    }
  }

  async fetchChats(data?: Record<string, string | number>): Promise<ChatInfo[]> {
    let chats: ChatInfo[] = [];
    try {
      chats = await this._api.read(data);
      chats.map(async (chat: ChatInfo) => {
        const token = await this.getToken(chat.id);
        if (token) {
          await MessagesController.connect(chat.id, token);
        }
      });
      store.set(
        "chats",
        chats
        // TODO: think how to sort chat list
        // (chats as ChatInfo[])
        //   .sort((chat1, chat2) => chat1.unread_count - chat2.unread_count ||
        //     chat1.title.localeCompare(chat2.title))
      );
    } catch (e: unknown) {
      store.set("error", (e as ErrorWithReason).reason);
    }
    return chats;
  }

  async addUserToChat(id: number, userId: number) {
    try {
      await this._api.addUsers(id, [userId]);
      const users = await this._api.getUsers(id);
      store.set("selectedChatUsers", users);
    } catch (e: unknown) {
      store.set("error", (e as ErrorWithReason).reason);
    }
  }

  async deleteUserFromChat(id: number, userId: number) {
    try {
      await this._api.deleteUsers(id, [userId]);
      const users = await this._api.getUsers(id);
      store.set("selectedChatUsers", users);
    } catch (e: unknown) {
      store.set("error", (e as ErrorWithReason).reason);
    }
  }

  async updateAvatar(formData: FormData) {
    try {
      await this._api.updateAvatar(formData);
      this.fetchChats();
    } catch (e: unknown) {
      store.set("error", (e as ErrorWithReason).reason);
    }
  }

  async deleteChat(id: number) {
    try {
      await this._api.delete(id);
      await this.fetchChats();
      store.set("selectedChatId", undefined);
      router.go(Routes.MESSENGER);
    } catch (e: unknown) {
      store.set("error", (e as ErrorWithReason).reason);
    }
  }

  getToken(id: number) {
    let token;
    try {
      token = this._api.getToken(id);
    } catch (e: unknown) {
      store.set("error", (e as ErrorWithReason).reason);
    }
    return token;
  }

  async selectChat(id: number) {
    try {
      const users = await this._api.getUsers(id);
      store.set("selectedChatUsers", users);
      store.set("selectedChatId", id);
    } catch (e: unknown) {
      store.set("error", (e as ErrorWithReason).reason);
    }
  }
}

export const ChatsController = new ChatController();
