import WS, {WSEvents, Message} from "../utils/WS";
import store from "../utils/storage";

class MessagesController {
  private sockets: Map<number, WS> = new Map();

  async connect(id: number, token: string) {
    if (this.sockets.has(id)) {
      return;
    }

    try {
      const userId = store.getState().user!.data.id;
      const wsTransport = new WS(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`);
      this.sockets.set(id, wsTransport);
      await wsTransport.connect();
      this.subscribe(wsTransport, id);
      this.fetchOldMessages(id);
    } catch (e: any) {
      store.set("error", `Chat #${id}: ${e.reason}`);
    }
  }

  sendMessage(id: number, message: string) {
    const socket = this.sockets.get(id);

    if (!socket) {
      store.set("error", `Chat #${id}: Chat is not connected`);
    } else {
      try {
        socket.send({
          type: "message",
          content: message
        });
      } catch (e:any) {
        store.set("error", `Chat #${id}: ${e.reason}`);
      }
    }
  }

  fetchOldMessages(id: number) {
    const socket = this.sockets.get(id);

    if (!socket) {
      store.set("error", `Chat #${id}: Chat is not connected`);
    } else {
      try {
        socket.send({ type: "get old", content: "0" });
      } catch (e: any) {
        store.set("error", `Chat #${id}: ${e.reason}`);
      }
    }
  }

  closeAll() {
    try {
      Array.from(this.sockets.values()).forEach((socket) => socket.close());
    } catch (e: any) {
      store.set("error", e.reason);
    }
  }

  private onMessage(id: number, messages: Message | Message[]) {
    let messagesToAdd: Message[] = [];

    if (Array.isArray(messages)) {
      messagesToAdd = messages.reverse();
    } else {
      messagesToAdd.push(messages);
    }

    const currentMessages = (store.getState().messages || {})[id] || [];

    messagesToAdd = [...currentMessages, ...messagesToAdd];

    store.set(`messages.${id}`, messagesToAdd);
  }

  private onClose(id: number) {
    this.sockets.delete(id);
  }

  private subscribe(transport: WS, id: number) {
    transport.on(WSEvents.Message, (message) => this.onMessage(id, message));
    transport.on(WSEvents.Close, () => this.onClose(id));
  }
}

export default new MessagesController();
