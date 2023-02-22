import Block from "../../utils/Block";

import template from "./button.hbs";
import "./button.pcss";

interface ButtonProps {
  text: string,
  secondary?: boolean,
  disabled?: boolean
}

export default class Button extends Block {
  props!: ButtonProps;

  render() {
    return this.compile(template, this.props);
  }
}
