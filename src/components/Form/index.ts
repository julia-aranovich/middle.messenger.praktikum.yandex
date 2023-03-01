import Block from "../../utils/Block";

import Field from "../Field";

import template from "./form.hbs";
import "./form.pcss";

export interface FormProps {
  submitButton?: Block,
  fields: Block[],
  actions?: Block[],
  events?: {
    submit: (e: Event) => void
  },
  iconAttach?: string,
  iconArrowRight?: string
}

export default class Form extends Block<FormProps> {
  get data() {
    return (<Field[]> this.children.fields).reduce((
      result: Record<string, string>,
      field: Block
    ) => ({
      ...result,
      ...{[field.props!.name]: (<Field>field).getValue()}
    }), {});
  }

  logData() {
    // eslint-disable-next-line no-console
    console.log(this.data);
  }

  isValid(): boolean {
    let result = true;
    (<Field[]> this.children.fields).forEach((field: Block) => {
      result = (<Field>field).isValid() && result;
    });
    return result;
  }

  render() {
    return this.compile(template, {});
  }
}
