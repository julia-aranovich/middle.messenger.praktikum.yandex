import Block from "../../utils/Block";
import Sidebar from "../../components/Sidebar";
import Link from "../../components/Link";

import template from "./messenger.hbs";
import "./messenger.pcss";
import {State} from "../../utils/Store";
import withStore from "../../hocs/withStore";
import withControllers from "../../hocs/withControllers";
import ChatsController from "../../controllers/ChatsController";

import Avatar, {AVATAR_SIZES} from "../../components/Avatar";
// import Message, {MessageProps} from "../../components/Message";
// import NewMessageForm from "../../components/NewMessageForm";
import {ChatInfo} from "../../api/ChatsAPI";
import {User} from "../../api/AuthAPI";

// import iconAttach from "../../static/icons/icon_attach.svg";
// import iconArrowRight from "../../static/icons/icon_arrow_right.svg";

interface MessengerProps {
  selectedChatId?: number,
  selectedChatUsers?: User[],
  selectedChat?: ChatInfo,
  chatsController: typeof ChatsController
}

class Messenger extends Block<MessengerProps> {
  init() {
    this.children.sidebar = new Sidebar({});
    this.children.editChatLink = new Link({
      to: "/edit-chat",
      text: "Управление чатом",
      compact: true
    });

    this.generateChildren();
  }

  componentDidUpdate(_oldProps: MessengerProps, _newProps: MessengerProps) {
    this.generateChildren(_newProps.selectedChat);
    return true;
  }

  generateChildren(selectedChat?: ChatInfo) {
    const chat = selectedChat || this.props.selectedChat;
    if (chat) {
      this.children.avatar = new Avatar({
        avatar: chat.avatar,
        title: chat.title,
        size: AVATAR_SIZES.MEDIUM
      });
      // this.children.messages = this.props.messages.map(
      //   (message: MessageProps): Block => new Message(message)
      // );
      // this.children.form = new NewMessageForm({
      //   ...this.props,
      //   events: {
      //     submit: (e) => {
      //       e.preventDefault();
      //       (<Form>this.children.form).logData();
      //    }
      //  }
      // });
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withStore((state: State) => ({
  selectedChatId: state.selectedChatId,
  selectedChatUsers: state.selectedChatUsers,
  selectedChat: state.selectedChatId &&
    state.chats?.find((chat) => chat.id === state.selectedChatId)
}))(
  withControllers(Messenger, {chatsController: ChatsController})
);
