import Form from "../Form";

import template from "./new_message_form.hbs";
import "./new_message_form.pcss";

export default class NewMessageForm extends Form {
  get data() {
    return {
      message: (<HTMLInputElement> this.getContent().querySelector("[name=message]")).value
    };
  }

  render() {
    return this.compile(template, this.props);
  }
}
