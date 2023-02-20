import Block from "../../utils/Block";

import Button from "../../components/Button";
import Field from "../../components/Field";
import Form from "../../components/Form";

import {CHAT_LIST_PAGE, LOGIN_PAGE, REGISTRATION_PAGE} from "../../utils/routes";
import PAGE_FIELDS, {Field as FieldProps} from "../../utils/fields";

import template from "./login_page.hbs";

export default class LoginPage extends Block {
  init() {
    this.children.form = new Form({
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          (<Form> this.children.form).logData();
          if ((<Form> this.children.form).isValid()) {
            window.renderPage(CHAT_LIST_PAGE);
          }
        }
      },
      children: {
        submitButton: new Button({
          text: "Войти"
        }),
        actions: [
          new Button({
            text: "Зарегистрироваться",
            secondary: true,
            events: {
              click: () => window.renderPage(REGISTRATION_PAGE)
            }
          })
        ],
        fields: PAGE_FIELDS[LOGIN_PAGE].map((field: FieldProps) => new Field(field))
      }
    });
  }

  render() {
    return this.compile(template, {});
  }
}
