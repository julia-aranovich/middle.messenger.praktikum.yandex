import Block from "../../utils/Block";
import Input from "../Input";
import Textarea from "../Textarea";

import template from "./field.hbs";
import "./field.pcss";

export interface FieldProps {
  name: string,
  type?: string,
  label?: string,
  value?: string | number,
  placeholder?: string,
  disabled?: boolean,
  mandatory?: boolean,
  regex?: string,
  error_text?: string
}

export default class Field extends Block<FieldProps> {
  init() {
    const props = {
      ...this.props,
      events: {
        blur: () => this.isValid(),
        focus: () => this.isValid()
      }
    };
    this.children.input = props.type === "textarea" ? new Textarea(props) : new Input(props);
  }

  isValid(): boolean {
    const value: string = this.getValue();
    const regexError: boolean = !!this.props.regex && !new RegExp(this.props.regex).test(value);
    const error: boolean = this.props.mandatory ? !value || regexError : !!value && regexError;
    // show/hide error in the following imperative way just to avoid component re-render:
    // otherwise, input focus event causes Field re-render and the input is replaced by new element
    // when replaced, it's blur event emitted. But the input already removed from DOM => error
    if (error) {
      this.element.classList.add("error");
    } else {
      this.element.classList.remove("error");
    }
    return !error;
  }

  getValue(): string {
    return ((this.children.input as Block).element as HTMLInputElement).value.trim();
  }

  setValue(value: string) {
    ((this.children.input as Block).element as HTMLInputElement).value = value;
  }

  render() {
    return this.compile(template, this.props);
  }
}
