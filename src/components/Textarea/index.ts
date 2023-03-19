import Block from "../../utils/Block";
import {InputProps} from "../Input";

import template from "./textarea.hbs";

export default class Textarea extends Block<InputProps> {
  render() {
    return this.compile(template, this.props);
  }
}
