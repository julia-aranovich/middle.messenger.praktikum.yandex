import Form, {FormProps} from "../Form";

import template from "./new_message_form.hbs";
import "./new_message_form.pcss";

export interface NewMessageFormProps extends FormProps {
  iconAttach: string,
  iconArrowRight: string
}

export default class NewMessageForm extends Form {
  props!: NewMessageFormProps;

  get data(): {message: string} {
    return {
      message: (<HTMLInputElement> this.getContent().querySelector("[name=message]")).value
    };
  }

  render() {
    return this.compile(template, this.props);
  }
}
