import Block from "../../utils/Block";

import Button from "../../components/Button";
import ButtonLink from "../../components/ButtonLink";
import Field, {FieldProps} from "../../components/Field";
import Form from "../../components/Form";
import Avatar, {AVATAR_SIZES} from "../../components/Avatar";
import {ProfilePageProps} from "../ProfilePage";

import Router, {Routes} from "../../utils/Router";
import PAGE_FIELDS from "../../utils/fields";

import template from "./change_password_page.hbs";

export default class ChangePasswordPage extends Block<ProfilePageProps> {
  init() {
    this.children.avatar = new Avatar({
      title: this.props.first_name,
      size: AVATAR_SIZES.LARGE
    });
    this.children.form = new Form({
      submitButton: new Button({
        text: "Изменить пароль",
        events: {
          click: (e: Event) => {
            e.preventDefault();
            (<Form> this.children.form).logData();
            if ((<Form> this.children.form).isValid()) {
              Router.go(Routes.LOGIN_PAGE);
            }
          }
        }
      }),
      actions: [
        new ButtonLink({
          to: Routes.PROFILE_PAGE,
          text: "Назад в профиль"
        })
      ],
      fields: PAGE_FIELDS[Routes.CHANGE_PASSWORD_PAGE].map((field: FieldProps) => new Field(field))
    });
  }

  render() {
    return this.compile(template, {});
  }
}
