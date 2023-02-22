import Block from "../../utils/Block";

import template from "./input.hbs";

interface InputProps {
  name: string,
  type?: string,
  value?: string,
  placeholder?: string,
  disabled?: boolean
}

export default class Input extends Block {
  props!: InputProps;

  render() {
    return this.compile(template, {type: "text", ...this.props});
  }
}
