import Block from "../../utils/Block";

import template from "./button.hbs";
import "./button.pcss";

interface ButtonProps {
  text: string,
  secondary?: boolean,
  compact?: boolean,
  disabled?: boolean,
  events?: {
    click: (e: Event) => void
  },
  img?: string
}

export default class Button extends Block<ButtonProps> {
  render() {
    return this.compile(template, this.props);
  }
}
