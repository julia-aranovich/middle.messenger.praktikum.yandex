import Block from "../../utils/Block";

import template from "./input.hbs";

export default class Input extends Block {
  render() {
    return this.compile(template, {type: "text", ...this.props});
  }
}
