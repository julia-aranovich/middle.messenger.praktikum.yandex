import Block from "../../utils/Block";

import template from "./button.hbs";
import "./button.pcss";

export default class Button extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
