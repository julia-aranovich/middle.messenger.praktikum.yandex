import Block from "../../utils/Block";

import Sidebar from "../../components/Sidebar";
import Form from "../../components/Form";
import Avatar, {AVATAR_SIZES} from "../../components/Avatar";
import Message, {MessageProps} from "../../components/Message";
import NewMessageForm from "../../components/NewMessageForm";

import template from "./chat_page.hbs";
import "./chat_page.pcss";

export default class ChatPage extends Block {
  init() {
    this.children.sidebar = new Sidebar(this.props);
    this.children.avatar = new Avatar({
      title: this.props.chat.title,
      size: AVATAR_SIZES.MEDIUM
    });
    this.children.messages = this.props.messages.map(
      (message: MessageProps) => new Message(message)
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
