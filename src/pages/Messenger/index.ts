import Block from "../../utils/Block";
import Sidebar from "../../components/Sidebar";
import Link from "../../components/Link";
import Form from "../../components/Form";
import Field from "../../components/Field";
import Button from "../../components/Button";

import template from "./messenger.hbs";
import "./messenger.pcss";
import {State} from "../../utils/storage";
import withStore from "../../hocs/withStore";
import withControllers from "../../hocs/withControllers";
import {ChatsController} from "../../controllers/ChatsController";
import MessagesController from "../../controllers/MessagesController";

import Avatar, {AVATAR_SIZES} from "../../components/Avatar";
import MessageComponent from "../../components/Message";
import {ChatInfo} from "../../api/ChatsAPI";
import {User} from "../../api/AuthAPI";
import {Message} from "../../utils/WS";
import {Routes} from "../../utils/navigation";

import iconArrowRight from "../../../static/icons/icon_arrow_right.svg";

interface MessengerProps {
  selectedChatId?: number,
  selectedChatUsers?: User[],
  selectedChat?: ChatInfo,
  chatsController: typeof ChatsController,
  messages: Message[]
}

class Messenger extends Block<MessengerProps> {
  init() {
    this.children.sidebar = new Sidebar({});

    this.props.chatsController.fetchChats().finally(() => {
      (this.children.sidebar as Block).setProps({isLoaded: true});
    });

    this.children.editChatLink = new Link({
      to: Routes.EDIT_CHAT_PAGE,
      text: "Управление чатом",
      compact: true
    });
    this.children.form = new Form({
      className: "chat-message-form",
      events: {
        submit: (e: Event) => this.sendMessage(e)
      },
      fields: [new Field({
        type: "textarea",
        name: "message"
      })],
      imgButton: new Button({
        text: "Отправить сообщение",
        img: iconArrowRight
      })
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
      this.children.messages = this.props.messages.map(
        (message: Message): Block => new MessageComponent(message)
      );
    }
  }

  sendMessage(e: Event) {
    e.preventDefault();
    const {message} = (this.children.form as Form).data;
    if (message.trim()) {
      ((this.children.form as Form).children.fields as Field[])[0].setValue("");
      MessagesController.sendMessage(this.props.selectedChatId!, message);
    }
  }

  get subtitle(): string {
    const lastMessage = (this.props.selectedChat || {}).last_message;
    return lastMessage ?
      new Date(lastMessage.time).toLocaleDateString("ru-Ru") : "В чате пока нет сообщений";
  }

  render() {
    return this.compile(template, {
      ...this.props,
      subtitle: this.subtitle
    });
  }
}

export default withStore((state: State) => ({
  selectedChatId: state.selectedChatId,
  selectedChatUsers: state.selectedChatUsers,
  selectedChat: state.selectedChatId &&
    state.chats?.find((chat) => chat.id === state.selectedChatId),
  messages: (state.messages && state.selectedChatId && state.messages[state.selectedChatId]) || []
}))(
  withControllers(Messenger, {chatsController: ChatsController})
);
