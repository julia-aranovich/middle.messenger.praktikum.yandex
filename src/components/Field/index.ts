import Block from "../../utils/Block";
import Input from "../Input";

import template from "./field.hbs";
import "./field.pcss";

export default class Field extends Block {
  init() {
    this.children.input = new Input({
      ...this.props,
      events: {
        blur: () => this.isValid()
      }
    });
  }

  isValid(): boolean {
    const value: string = this.getValue();
    const regexError: boolean = !!this.props.regex && !new RegExp(this.props.regex).test(value);
    const error: boolean = this.props.mandatory ? !value || regexError : !!value && regexError;
    this.setProps({...this.props, error});
    return !error;
  }

  getValue(): string {
    return (<HTMLInputElement> this.getContent().querySelector(`[name=${this.props.name}]`)).value;
  }

  render() {
    return this.compile(template, this.props);
  }
}
