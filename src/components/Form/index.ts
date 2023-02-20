import Block from "../../utils/Block";

import Field from "../Field";

import template from "./form.hbs";
import "./form.pcss";

export default class Form extends Block {
  init() {
    this.children = {...this.props.children};
  }

  get data() {
    return (<Field[]><unknown> this.children.fields).reduce((
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
    (<Field[]><unknown> this.children.fields).forEach((field: Block) => {
      result = (<Field>field).isValid() && result;
    });
    return result;
  }

  render() {
    return this.compile(template, this.props);
  }
}
