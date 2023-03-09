import Block from "../../utils/Block";

import Button from "../../components/Button";
import ButtonLink from "../../components/ButtonLink";
import Field, {FieldProps} from "../../components/Field";
import Form from "../../components/Form";

import Router, {Routes} from "../../utils/Router";
import PAGE_FIELDS from "../../utils/fields";

import template from "./login_page.hbs";

export default class LoginPage extends Block {
  init() {
    this.children.form = new Form({
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          (<Form> this.children.form).logData();
          if ((<Form> this.children.form).isValid()) {
            Router.go(Routes.CHAT_LIST_PAGE);
          }
        }
      },
      submitButton: new Button({
        text: "Войти"
      }),
      actions: [
        new ButtonLink({
          to: Routes.REGISTRATION_PAGE,
          text: "Зарегистрироваться"
        })
      ],
      fields: PAGE_FIELDS[Routes.LOGIN_PAGE].map((field: FieldProps): Block => new Field(field))
    });
  }

  render() {
    return this.compile(template, {});
  }
}
