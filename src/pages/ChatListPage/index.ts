import Block from "../../utils/Block";
import Sidebar, {SidebarProps} from "../../components/Sidebar";

import template from "./chat_list_page.hbs";
import "./chat_list_page.pcss";

export default class ChatListPage extends Block {
  props!: SidebarProps;

  init() {
    this.children.sidebar = new Sidebar(this.props);
  }

  render() {
    return this.compile(template, {});
  }
}
