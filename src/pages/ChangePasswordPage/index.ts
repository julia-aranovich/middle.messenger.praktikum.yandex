import Block from "../../utils/Block";

import Button from "../../components/Button";
import Field from "../../components/Field";
import Form from "../../components/Form";
import Avatar, {AVATAR_SIZES} from "../../components/Avatar";

import {CHANGE_PASSWORD_PAGE, LOGIN_PAGE, PROFILE_PAGE} from "../../utils/routes";
import PAGE_FIELDS, {Field as FieldProps} from "../../utils/fields";

import template from "./change_password_page.hbs";

export default class ChangePasswordPage extends Block {
  init() {
    this.children.avatar = new Avatar({
      title: this.props.first_name,
      size: AVATAR_SIZES.LARGE
    });
    this.children.form = new Form({
      children: {
        submitButton: new Button({
          text: "Изменить пароль",
          events: {
            click: (e: Event) => {
              e.preventDefault();
              (<Form> this.children.form).logData();
              if ((<Form> this.children.form).isValid()) {
                window.renderPage(LOGIN_PAGE);
              }
            }
          }
        }),
        actions: [
          new Button({
            text: "Назад в профиль",
            secondary: true,
            events: {
              click: () => window.renderPage(PROFILE_PAGE)
            }
          })
        ],
        fields: PAGE_FIELDS[CHANGE_PASSWORD_PAGE].map((field: FieldProps) => new Field(field))
      }
    });
  }

  render() {
    return this.compile(template, {});
  }
}
