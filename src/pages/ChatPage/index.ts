import Block from "../../utils/Block";

import Sidebar, {SidebarProps} from "../../components/Sidebar";
import Form from "../../components/Form";
import Avatar, {AVATAR_SIZES} from "../../components/Avatar";
import Message, {MessageProps} from "../../components/Message";
import NewMessageForm, {NewMessageFormProps} from "../../components/NewMessageForm";
import {ChatPreviewProps} from "../../components/ChatPreview";

import template from "./chat_page.hbs";
import "./chat_page.pcss";

interface ChatPageProps extends SidebarProps, NewMessageFormProps {
  chat: ChatPreviewProps,
  messages: MessageProps[]
}

export default class ChatPage extends Block {
  props!: ChatPageProps;

  init() {
    this.children.sidebar = new Sidebar(this.props);
    this.children.avatar = new Avatar({
      title: this.props.chat.title,
      size: AVATAR_SIZES.MEDIUM
    });
    (<Block[]><unknown>this.children.messages) = this.props.messages.map(
      (message: MessageProps): Block => new Message(message)
    );
    this.children.form = new NewMessageForm({
      ...this.props,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          (<Form> this.children.form).logData();
        }
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
