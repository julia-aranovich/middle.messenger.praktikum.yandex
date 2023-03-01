import Block from "../../utils/Block";

import Button from "../../components/Button";
import Field, {FieldProps} from "../../components/Field";
import Form from "../../components/Form";

import {LOGIN_PAGE, REGISTRATION_PAGE} from "../../utils/routes";
import PAGE_FIELDS from "../../utils/fields";

import template from "./registration_page.hbs";

export default class RegistrationPage extends Block {
  init() {
    this.children.form = new Form({
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          (<Form> this.children.form).logData();
          if ((<Form> this.children.form).isValid()) {
            window.renderPage(LOGIN_PAGE);
          }
        }
      },
      submitButton: new Button({
        text: "Зарегистрироваться"
      }),
      actions: [
        new Button({
          text: "Войти",
          secondary: true,
          events: {
            click: () => window.renderPage(LOGIN_PAGE)
          }
        })
      ],
      fields: PAGE_FIELDS[REGISTRATION_PAGE].map((field: FieldProps): Block => new Field(field))
    });
  }

  render() {
    return this.compile(template, {});
  }
}
