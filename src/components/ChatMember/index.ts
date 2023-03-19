import withControllers from "../../hocs/withControllers";
import withStore from "../../hocs/withStore";
import ChatsController from "../../controllers/ChatsController";
import Block from "../../utils/Block";
import Button from "../Button";

import template from "./chat_member.hbs";
import "./chat_member.pcss";
import {State} from "../../utils/storage";
import {User} from "../../api/AuthAPI";

interface ChatMemberProps {
  addMode?: boolean,
  chats: typeof ChatsController,
  selectedChatId: number,
  user: User
}

class ChatMember extends Block<ChatMemberProps> {
  init() {
    this.generateChildren();
  }

  componentDidUpdate(_oldProps: ChatMemberProps, _newProps: ChatMemberProps) {
    this.generateChildren();
    return true;
  }

  generateChildren() {
    this.children.deleteLink = new Button({
      text: "Удалить",
      compact: true,
      events: {
        click: (e) => this.deleteMember(e, this.props.user.id)
      }
    });

    this.children.addLink = new Button({
      text: "Добавить",
      compact: true,
      events: {
        click: (e) => this.addMember(e, this.props.user.id)
      }
    });
  }

  deleteMember(e: Event, id: number) {
    e.preventDefault();
    this.props.chats.deleteUserFromChat(this.props.selectedChatId, id);
  }

  addMember(e: Event, id: number) {
    e.preventDefault();
    this.props.chats.addUserToChat(this.props.selectedChatId, id);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withStore((state: State) => ({
  selectedChatId: state.selectedChatId
}))(
  withControllers(ChatMember, {chats: ChatsController})
);
