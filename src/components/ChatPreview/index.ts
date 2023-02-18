import Block from "../../utils/Block";
import Avatar from "../Avatar";

import template from "./chat_preview.hbs";
import "./chat_preview.pcss";

export type ChatProps = {
  title: string,
  members_count?: number,
  unread?: number,
  selected?: boolean,
  last_updated: string
};

export default class ChatPreview extends Block {
  init() {
    this.children.avatar = new Avatar({
      title: this.props.title
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
