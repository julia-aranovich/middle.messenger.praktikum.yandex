import Block from "../../utils/Block";

import Button from "../../components/Button";
import Field, {FieldProps} from "../../components/Field";
import Form from "../../components/Form";
import Avatar, {AVATAR_SIZES} from "../../components/Avatar";
import {User} from "../../api/AuthAPI";

import {Routes} from "../../utils/Router";

import template from "./update_profile_page.hbs";
import PAGE_FIELDS from "../../utils/fields";

import withUser, {PropsWithUser} from "../../hocs/withUser";
import withControllers from "../../hocs/withControllers";
import UserController from "../../controllers/UserController";
import {UpdateProfileData} from "../../api/UserAPI";

class UpdateProfilePage extends Block<PropsWithUser & {userController: typeof UserController}> {
  init() {
    this.children.avatar = new Avatar({
      avatar: this.props.avatar,
      title: this.props.first_name || this.props.login,
      size: AVATAR_SIZES.LARGE
    });
    this.children.form = new Form({
      events: {
        submit: (e) => this.onSubmit(e)
      },
      submitButton: new Button({
        text: "Сохранить"
      }),
      fields: PAGE_FIELDS[Routes.PROFILE_PAGE].map((field: FieldProps): Block => new Field({
        ...field,
        value: this.props[field.name as keyof User]
      }))
    });
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    if ((this.children.form as Form).isValid()) {
      await this.props.userController.updateProfile(
        (this.children.form as Form).data as UpdateProfileData
      );
    }
  }

  render() {
    return this.compile(template, {});
  }
}

export default withUser(withControllers(UpdateProfilePage, {userController: UserController}));
