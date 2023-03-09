import Block from "../../utils/Block";
import Form from "../Form";
import Field from "../Field";
import ChatPreview, {ChatPreviewProps} from "../ChatPreview";

import Router, {Routes} from "../../utils/Router";
import {SEARCH} from "../../utils/fields";

import template from "./sidebar.hbs";
import "./sidebar.pcss";

export interface SidebarProps {
  search?: string,
  chats: ChatPreviewProps[]
}

export default class Sidebar extends Block<SidebarProps> {
  init() {
    this.children.searchForm = new Form({
      fields: [new Field({...SEARCH, value: this.props.search})]
    });
    this.children.chats = this.props.chats.map(
      (chat: ChatPreviewProps): Block => new ChatPreview({
        ...chat,
        events: {
          click: () => Router.go(Routes.CHAT_PAGE)
        }
      })
    );
  }

  render() {
    return this.compile(template, {});
  }
}
