import Block from "../../utils/Block";

import template from "./input.hbs";

interface InputProps {
  name: string,
  type?: string,
  value?: string | number,
  placeholder?: string,
  disabled?: boolean,
  events: {
    blur: (e: Event) => void,
    focus: (e: Event) => void
  }
}

export default class Input extends Block<InputProps> {
  render() {
    return this.compile(template, {type: "text", ...this.props});
  }
}
