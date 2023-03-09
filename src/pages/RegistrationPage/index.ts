import Block from "../../utils/Block";

import Button from "../../components/Button";
import ButtonLink from "../../components/ButtonLink";
import Field, {FieldProps} from "../../components/Field";
import Form from "../../components/Form";

import Router, {Routes} from "../../utils/Router";
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
            Router.go(Routes.LOGIN_PAGE);
          }
        }
      },
      submitButton: new Button({
        text: "Зарегистрироваться"
      }),
      actions: [
        new ButtonLink({
          to: Routes.LOGIN_PAGE,
          text: "Войти"
        })
      ],
      fields: PAGE_FIELDS[Routes.REGISTRATION_PAGE]
        .map((field: FieldProps): Block => new Field(field))
    });
  }

  render() {
    return this.compile(template, {});
  }
}
