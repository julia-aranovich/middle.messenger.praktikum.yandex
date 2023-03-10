type Callback = (...args: any[]) => void;

export default class EventBus {
  private readonly listeners: Record<string, Callback[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Callback): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: Callback): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener): boolean => listener !== callback
    );
  }

  emit(event: string, ...args: unknown[]): void {
    // if (!this.listeners[event]) {
    //   throw new Error(`Нет события: ${event}`);
    // }

    (this.listeners[event] || []).forEach((listener) => {
      listener(...args);
    });
  }
}
