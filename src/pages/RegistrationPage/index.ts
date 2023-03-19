import Block from "../../utils/Block";

import Button from "../../components/Button";
import Link from "../../components/Link";
import Field, {FieldProps} from "../../components/Field";
import Form from "../../components/Form";

import {Routes} from "../../utils/navigation";
import PAGE_FIELDS from "../../utils/fields";

import template from "./registration_page.hbs";

import AuthController from "../../controllers/AuthController";
import {SignupData} from "../../api/AuthAPI";
import withUser, {PropsWithUser} from "../../hocs/withUser";
import withControllers from "../../hocs/withControllers";

class RegistrationPage extends Block<PropsWithUser & {auth: typeof AuthController}> {
  init() {
    this.children.form = new Form({
      events: {
        submit: (e) => this.onSubmit(e)
      },
      submitButton: new Button({
        text: "Зарегистрироваться"
      }),
      actions: [
        new Link({
          to: Routes.LOGIN_PAGE,
          text: "Войти"
        })
      ],
      fields: PAGE_FIELDS[Routes.REGISTRATION_PAGE]
        .map((field: FieldProps): Block => new Field(field))
    });
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    if ((this.children.form as Form).isValid()) {
      await this.props.auth.signup((this.children.form as Form).data as SignupData);
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withUser(withControllers(RegistrationPage, {auth: AuthController}));
