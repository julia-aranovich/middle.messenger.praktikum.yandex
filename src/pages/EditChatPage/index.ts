import Block from "../../utils/Block";
import Sidebar from "../../components/Sidebar";

import template from "./edit_chat_page.hbs";
import "./edit_chat_page.pcss";
import {State} from "../../utils/Store";
import withStore from "../../hocs/withStore";
import withControllers from "../../hocs/withControllers";
import ChatsController from "../../controllers/ChatsController";

import Avatar, {AVATAR_SIZES} from "../../components/Avatar";
import Button from "../../components/Button";
import ChatMember from "../../components/ChatMember";
import {User} from "../../api/AuthAPI";
import ChangeAvatarModal from "../../components/ChangeAvatarModal";
import AddMemberForm from "../../components/AddMemberForm";
import { ChatInfo } from "../../api/ChatsAPI";

interface EditChatPageProps {
  selectedChatId: number,
  selectedChatUsers: User[],
  selectedChat: ChatInfo,
  chatsController: typeof ChatsController
}

class EditChatPage extends Block<EditChatPageProps> {
  init() {
    this.children.sidebar = new Sidebar({});

    this.children.deleteChatLink = new Button({
      text: "Удалить чат",
      compact: true,
      events: {
        click: (e) => this.deleteChat(e)
      }
    });

    this.children.addMemberForm = new AddMemberForm({});

    this.children.changeAvatarModal = new (withStore((state: State) => ({
      selectedChatId: state.selectedChatId
    }))(withControllers(ChangeAvatarModal, {controller: ChatsController})))({});

    this.children.chageAvatarLink = new Button({
      text: "Загрузить аватар",
      compact: true,
      events: {
        click: (e) => {
          e.preventDefault();
          (this.children.changeAvatarModal as Block).show();
        }
      }
    });

    this.children.avatar = new Avatar({
      avatar: this.props.selectedChat!.avatar,
      title: this.props.selectedChat!.title,
      size: AVATAR_SIZES.MEDIUM
    });

    this.updateMembers();
  }

  updateMembers(selectedChatUsers?: User[]) {
    this.children.members = (selectedChatUsers || this.props.selectedChatUsers || []).map(
      (user: User) => new ChatMember({user})
    );
  }

  componentDidUpdate(_oldProps: EditChatPageProps, _newProps: EditChatPageProps) {
    this.updateMembers(_newProps.selectedChatUsers);
    return true;
  }

  async deleteChat(e: Event) {
    e.preventDefault();
    await this.props.chatsController.deleteChat(this.props.selectedChatId);
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
  withControllers(EditChatPage, {chatsController: ChatsController})
);
