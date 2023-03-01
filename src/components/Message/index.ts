import Block from "../../utils/Block";

import template from "./message.hbs";
import "./message.pcss";

function twoDigitsString(int: number): string {
  return String(int).padStart(2, "0");
}

export type MessageProps = {
  author: string,
  text: string,
  created_at?: string,
  my?: boolean,
  img?: string
};

export default class Message extends Block<MessageProps> {
  get date(): string {
    // the next line to be removed after getting data from API
    if (this.props.created_at) return this.props.created_at;
    const d = new Date(this.props.created_at || Date.now());
    return `${twoDigitsString(d.getHours())}:${twoDigitsString(d.getMinutes())}`;
  }

  render() {
    return this.compile(template, {...this.props, date: this.date});
  }
}
