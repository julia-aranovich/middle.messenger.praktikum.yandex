import Block from "../../utils/Block";

import Button from "../../components/Button";
import Link from "../../components/Link";
import Field, {FieldProps} from "../../components/Field";
import Form from "../../components/Form";

import {Routes} from "../../utils/Router";
import PAGE_FIELDS from "../../utils/fields";

import template from "./login_page.hbs";

import AuthController from "../../controllers/AuthController";
import ChatsController from "../../controllers/ChatsController";
import {SigninData} from "../../api/AuthAPI";
import withUser, {PropsWithUser} from "../../hocs/withUser";
import withControllers from "../../hocs/withControllers";

interface PropsWithControllers {
  auth: typeof AuthController,
  chats: typeof ChatsController
}

class LoginPage extends Block<PropsWithUser & PropsWithControllers> {
  init() {
    this.children.form = new Form({
      events: {
        submit: (e) => this.onSubmit(e)
      },
      submitButton: new Button({
        text: "Войти"
      }),
      actions: [
        new Link({
          to: Routes.REGISTRATION_PAGE,
          text: "Зарегистрироваться"
        })
      ],
      fields: PAGE_FIELDS[Routes.LOGIN_PAGE].map((field: FieldProps): Block => new Field(field))
    });
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    if ((this.children.form as Form).isValid()) {
      await this.props.auth.signin((this.children.form as Form).data as SigninData);
      await this.props.chats.fetchChats();
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withUser(withControllers(LoginPage, {auth: AuthController, chats: ChatsController}));
