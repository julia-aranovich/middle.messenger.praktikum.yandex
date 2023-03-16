import { User } from "../../api/AuthAPI";
import withStore from "../../hocs/withStore";
import Block from "../../utils/Block";
import { State } from "../../utils/storage";
import {Message as MessageProps} from "../../utils/WS";

import template from "./message.hbs";
import "./message.pcss";

function twoDigitsString(int: number): string {
  return String(int).padStart(2, "0");
}

export function formatDate(time: string): string {
  const d = new Date(time || Date.now());
  return `${twoDigitsString(d.getHours())}:${twoDigitsString(d.getMinutes())}`;
}

interface PropsWithUsers {
  selectedChatUsers: User[],
  user: User
}

class Message extends Block<MessageProps & PropsWithUsers> {
  get author(): string {
    const author = this.props.selectedChatUsers.find(
      (user: User) => user.id === this.props.user_id
    );
    return author ? `${author.first_name} ${author.second_name}` : "N/A";
  }

  get isMine(): boolean {
    return this.props.user_id === this.props.user.id;
  }

  render() {
    return this.compile(template, {
      ...this.props,
      date: formatDate(this.props.time),
      author: this.author,
      isMine: this.isMine
    });
  }
}

export default withStore((state: State) => ({
  selectedChatUsers: state.selectedChatUsers,
  user: state.user!.data
}))(Message);
