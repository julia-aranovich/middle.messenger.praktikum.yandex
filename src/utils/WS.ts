import EventBus from "./EventBus";

export enum WSEvents {
  Connected = "connected",
  Error = "error",
  Message = "message",
  Close = "close"
}

export interface Message {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  }
}

export default class WS extends EventBus {
  private socket: WebSocket | null = null;

  private pingInterval: number = 0;

  constructor(private url: string) {
    super();
  }

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error("Socket is not connected");
    }

    this.socket.send(JSON.stringify(data));
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url);

    this.subscribe(this.socket);

    this.setupPing();

    return new Promise((resolve) => {
      this.on(WSEvents.Connected, () => {
        resolve();
      });
    });
  }

  public close() {
    this.socket?.close();
  }

  private setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({type: "ping" });
    }, 5000);

    this.on(WSEvents.Close, () => {
      clearInterval(this.pingInterval);

      this.pingInterval = 0;
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener("open", () => {
      this.emit(WSEvents.Connected);
    });
    socket.addEventListener("close", () => {
      this.emit(WSEvents.Close);
    });

    socket.addEventListener("error", (e) => {
      this.emit(WSEvents.Error, e);
    });

    socket.addEventListener("message", (message) => {
      const data = JSON.parse(message.data);

      if (data.type && data.type === "pong") {
        return;
      }

      this.emit(WSEvents.Message, data);
    });
  }
}
