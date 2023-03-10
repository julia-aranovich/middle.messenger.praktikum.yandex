import EventBus from "./EventBus";
import {User} from "../api/AuthAPI";
import set from "../helpers/set";
import {ChatInfo} from "../api/ChatsAPI";
import {Message} from "./WS";

export enum StoreEvents {
  Updated = "updated"
}

export interface State {
  user?: {
    data: User,
    isLoading: boolean,
    error?: string
  },
  selectedChatId?: number,
  selectedChatUsers?: User[],
  messages?: Record<number, Message[]>,
  chats?: ChatInfo[],
  userSearchResults?: User[]
}

class Store extends EventBus {
  private _state: State = {};

  getState(): State {
    return this._state;
  }

  set(path: string, value: unknown) {
    set(this._state, path, value);
    this.emit(StoreEvents.Updated, this._state);
  }
}

export default new Store();
