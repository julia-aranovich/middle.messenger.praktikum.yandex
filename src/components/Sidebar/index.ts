import Block from "../../utils/Block";
import Form from "../Form";
import Field from "../Field";
import ChatPreview from "../ChatPreview";

import template from "./sidebar.hbs";
import "./sidebar.pcss";
import withRouter, {PropsWithRouter} from "../../hocs/withRouter";
import withStore from "../../hocs/withStore";
import {State} from "../../utils/storage";
import Button from "../Button";
import withControllers from "../../hocs/withControllers";
import {ChatsController} from "../../controllers/ChatsController";
import {ChatInfo} from "../../api/ChatsAPI";
import {Routes} from "../../utils/navigation";
import Link from "../Link";

interface SidebarProps extends PropsWithRouter {
  chats: ChatInfo[],
  selectedChatId?: number,
  chatsController: typeof ChatsController,
  isLoaded?: false
}

class Sidebar extends Block<SidebarProps> {
  init() {
    this.children.profileLink = new Link({
      to: "/settings",
      text: "Мой профиль",
      compact: true
    });
    this.children.searchForm = new Form({
      fields: [new Field({
        name: "search",
        placeholder: "Введите название чата и нажмите Enter"
      })],
      events: {
        submit: async (e: Event) => {
          e.preventDefault();
          await this.props.chatsController.fetchChats({title: this.searchValue});
        }
      }
    });
    this.children.createForm = new Form({
      className: "create-chat-form",
      fields: [new Field({name: "title", placeholder: "Введите название чата и нажмите Enter"})],
      events: {
        submit: async (e: Event) => {
          e.preventDefault();
          await this.props.chatsController.createChat(
            (this.children.createForm as Form).data.title
          );
          ((this.children.createForm as Form).children.fields as Field[])[0].hide();
          ((this.children.createForm as Form).children.submitButton as Block).show();
        }
      },
      submitButton: new Button({
        text: "Создать чат",
        secondary: true,
        events: {
          click: (e: Event) => {
            e.preventDefault();
            ((this.children.createForm as Form).children.fields as Field[])[0].show();
            ((this.children.createForm as Form).children.submitButton as Block).hide();
          }
        }
      })
    });

    this.generateChats();
  }

  componentDidUpdate(_oldProps: SidebarProps, _newProps: SidebarProps) {
    this.generateChats(_newProps.chats);
    return true;
  }

  generateChats(chats?: ChatInfo[]) {
    this.children.chats = (chats || this.props.chats || []).map(
      (chat) => new ChatPreview({
        chat,
        events: {
          click: () => {
            this.props.chatsController.selectChat(chat.id);
            this.props.router.go(Routes.MESSENGER);
          }
        }
      })
    );
  }

  get searchValue(): string {
    return ((this.children.searchForm as Form).children.fields as Field[])[0].getValue();
  }

  render() {
    return this.compile(template, {search: this.searchValue});
  }
}

export default withStore((state: State) => ({
  chats: state.chats,
  selectedChatId: state.selectedChatId
}))(
  withRouter(withControllers(Sidebar, {chatsController: ChatsController}))
);
