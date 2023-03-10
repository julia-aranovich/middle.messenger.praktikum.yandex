import Block from "../../utils/Block";
import Avatar from "../Avatar";
import {ChatInfo} from "../../api/ChatsAPI";

import template from "./chat_preview.hbs";
import "./chat_preview.pcss";
import withStore from "../../hocs/withStore";
import {State} from "../../utils/Store";

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
    return this.compile(
      template,
      {...this.props.chat, selected: this.props.chat.id === this.props.selectedChatId}
    );
  }
}

export default withStore((state: State) => ({selectedChatId: state.selectedChatId}))(ChatPreview);
