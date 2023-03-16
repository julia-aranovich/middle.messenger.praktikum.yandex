import Block from "../../utils/Block";
import Avatar from "../Avatar";
import {ChatInfo} from "../../api/ChatsAPI";

import template from "./chat_preview.hbs";
import "./chat_preview.pcss";
import withStore from "../../hocs/withStore";
import {State} from "../../utils/storage";
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
    this.generateAvatar();
  }

  generateAvatar(chat?: ChatInfo) {
    this.children.avatar = new Avatar(chat || this.props.chat);
  }

  componentDidUpdate(_oldProps: ChatPreviewProps, _newProps: ChatPreviewProps) {
    this.generateAvatar(_newProps.chat);
    return true;
  }

  render() {
    const lastMessage = this.props.chat.last_message;
    return this.compile(
      template,
      {
        ...this.props.chat,
        last_message: lastMessage === null ? null : {
          author: `${lastMessage.user.first_name} ${lastMessage.user.second_name}`,
          date: formatDate(lastMessage.time),
          content: lastMessage.content.substring(0, 25).trim()
        },
        selected: this.props.chat.id === this.props.selectedChatId
      }
    );
  }
}

export default withStore((state: State) => ({selectedChatId: state.selectedChatId}))(ChatPreview);
