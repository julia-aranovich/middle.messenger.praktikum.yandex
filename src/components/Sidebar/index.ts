import Block from "../../utils/Block";
import Button from "../Button";
import Form from "../Form";
import Field from "../Field";
import ChatPreview, {ChatProps} from "../ChatPreview";

import {CHAT_PAGE, PROFILE_PAGE} from "../../utils/routes";
import {SEARCH} from "../../utils/fields";

import template from "./sidebar.hbs";
import "./sidebar.pcss";

export default class Sidebar extends Block {
  init() {
    this.children.profileLink = new Button({
      text: "Мой профиль",
      secondary: true,
      events: {
        click: () => window.renderPage(PROFILE_PAGE)
      }
    });
    this.children.searchForm = new Form({
      children: {
        fields: [new Field({...SEARCH, value: this.props.search})]
      }
    });
    this.children.chats = this.props.chats.map(
      (chat: ChatProps) => new ChatPreview({
        ...chat,
        events: {
          click: () => window.renderPage(CHAT_PAGE)
        }
      })
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
