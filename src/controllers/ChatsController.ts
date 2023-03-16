import API, {ChatsAPI, ChatInfo} from "../api/ChatsAPI";
import router, {Routes} from "../utils/navigation";
import store from "../utils/storage";
import MessagesController from "./MessagesController";

class ChatsController {
  private readonly _api: ChatsAPI;

  constructor() {
    this._api = API;
  }

  async createChat(title: string) {
    await this._api.create(title);
    await this.fetchChats();
  }

  async fetchChats(data?: Record<string, string | number>): Promise<ChatInfo[]> {
    const chats = await this._api.read(data);
    chats.map(async (chat: ChatInfo) => {
      const token = await this.getToken(chat.id);
      await MessagesController.connect(chat.id, token);
    });

    store.set(
      "chats",
      chats
      // TODO: think how to sort chat list
      // (chats as ChatInfo[])
      //   .sort((chat1, chat2) => chat1.unread_count - chat2.unread_count ||
      //     chat1.title.localeCompare(chat2.title))
    );
    return chats;
  }

  async addUserToChat(id: number, userId: number) {
    await this._api.addUsers(id, [userId]);
    const users = await this._api.getUsers(id);
    store.set("selectedChatUsers", users);
  }

  async deleteUserFromChat(id: number, userId: number) {
    await this._api.deleteUsers(id, [userId]);
    const users = await this._api.getUsers(id);
    store.set("selectedChatUsers", users);
  }

  async updateAvatar(formData: FormData) {
    await this._api.updateAvatar(formData);
    this.fetchChats();
  }

  async deleteChat(id: number) {
    await this._api.delete(id);
    await this.fetchChats();
    store.set("selectedChatId", undefined);
    router.go(Routes.MESSENGER);
  }

  getToken(id: number) {
    return this._api.getToken(id);
  }

  async selectChat(id: number) {
    const users = await this._api.getUsers(id);
    store.set("selectedChatUsers", users);
    store.set("selectedChatId", id);
  }
}

export default new ChatsController();
