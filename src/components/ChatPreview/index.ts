import Block from "../../utils/Block";
import Avatar from "../Avatar";
import {ChatInfo} from "../../api/ChatsAPI";

import template from "./chat_preview.hbs";
import "./chat_preview.pcss";
import withStore from "../../hocs/withStore";
import {State} from "../../utils/Store";
import {formatDate} from "../Message";

export type ChatPreviewProps = {
  events: {
    click: (e: Event) => void
  },
  chat: ChatInfo,
  selectedChatId?: number
};

class ChatPreview extends Block<ChatPreviewProps> {
  init() {
    this.children.avatar = new Avatar(this.props.chat);
  }

  render() {
    const {last_message} = this.props.chat;
    return this.compile(
      template,
      {
        ...this.props.chat,
        last_message: last_message === null ? null : {
          author: `${last_message.user.first_name} ${last_message.user.second_name}`,
          date: formatDate(last_message.time),
          content: last_message.content.substring(0, 25).trim()
        },
        selected: this.props.chat.id === this.props.selectedChatId
      }
    );
  }
}

export default withStore((state: State) => ({selectedChatId: state.selectedChatId}))(ChatPreview);
