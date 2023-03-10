import Block from "../../utils/Block";

import Button from "../../components/Button";
import Link from "../../components/Link";
import Field, {FieldProps} from "../../components/Field";
import Form from "../../components/Form";
import Avatar, {AVATAR_SIZES} from "../../components/Avatar";

import {Routes} from "../../utils/Router";
import PAGE_FIELDS from "../../utils/fields";
import withUser, {PropsWithUser} from "../../hocs/withUser";
import withControllers from "../../hocs/withControllers";
import UserController from "../../controllers/UserController";

import template from "./change_password_page.hbs";
import store from "../../utils/Store";
import AuthController from "../../controllers/AuthController";

class ChangePasswordForm extends Form {
  isValid(): boolean {
    if (super.isValid()) {
      const error = this.data.newPassword !== this.data.repeatPassword;
      store.set("user.error", error ? "Повторите пароль: ввод не совпадает" : undefined);
      return !error;
    }
    return false;
  }
}

interface PropsWithControllers {
  auth: typeof AuthController,
  userController: typeof UserController
}

class ChangePasswordPage extends Block<PropsWithUser & PropsWithControllers> {
  init() {
    this.children.avatar = new Avatar({
      avatar: this.props.avatar,
      title: this.props.first_name || this.props.login,
      size: AVATAR_SIZES.LARGE
    });
    this.children.form = new ChangePasswordForm({
      events: {
        submit: (e) => this.onSubmit(e)
      },
      submitButton: new Button({
        text: "Изменить пароль"
      }),
      actions: [
        new Link({
          to: Routes.PROFILE_PAGE,
          text: "Назад в профиль"
        })
      ],
      fields: PAGE_FIELDS[Routes.CHANGE_PASSWORD_PAGE].map((field: FieldProps) => new Field(field))
    });
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    if ((this.children.form as Form).isValid()) {
      const {oldPassword, newPassword} = (this.children.form as Form).data;
      await this.props.userController.updatePassword({oldPassword, newPassword});
      await (this.props.auth as typeof AuthController).logout();
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withUser(withControllers(ChangePasswordPage, {
  auth: AuthController,
  userController: UserController
}));
