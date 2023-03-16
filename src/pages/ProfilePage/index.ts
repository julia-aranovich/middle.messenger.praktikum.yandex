import Block from "../../utils/Block";

import Button from "../../components/Button";
import Link from "../../components/Link";
import Field, {FieldProps} from "../../components/Field";
import Form from "../../components/Form";
import Avatar, {AVATAR_SIZES} from "../../components/Avatar";

import {Routes} from "../../utils/Router";
import PAGE_FIELDS from "../../utils/fields";

import template from "./profile_page.hbs";
import ChangeAvatarModal from "../../components/ChangeAvatarModal";

import withUser, {PropsWithUser} from "../../hocs/withUser";
import withControllers from "../../hocs/withControllers";
import AuthController from "../../controllers/AuthController";
import UserController from "../../controllers/UserController";
import {User} from "../../api/AuthAPI";

type ProfilePageProps = PropsWithUser & { auth: typeof AuthController };

class ProfilePage extends Block<ProfilePageProps> {
  init() {
    this.generateAvatar();

    this.children.changeAvatarModal = new (withControllers(ChangeAvatarModal, {
      controller: UserController
    }))({});

    this.children.chageAvatarLink = new Button({
      text: "Загрузить фото",
      secondary: true,
      events: {
        click: () => (this.children.changeAvatarModal as Block).show()
      }
    });

    this.children.form = new Form({
      actions: [
        new Link({
          to: Routes.UPDATE_PROFILE_PAGE,
          text: "Изменить данные"
        }),
        new Link({
          to: Routes.CHANGE_PASSWORD_PAGE,
          text: "Изменить пароль"
        }),
        new Link({
          to: Routes.MESSENGER,
          text: "Назад к чатам"
        }),
        new Button({
          text: "Выйти",
          secondary: true,
          events: {
            click: () => AuthController.logout()
          }
        })
      ],
      fields: PAGE_FIELDS[Routes.PROFILE_PAGE].map((field: FieldProps): Block => new Field({
        ...field,
        disabled: true,
        value: this.props[field.name as keyof User]
      }))
    });
  }

  generateAvatar(newProps?: ProfilePageProps) {
    const props = newProps || this.props;
    this.children.avatar = new Avatar({
      avatar: props.avatar,
      title: props.first_name || props.login,
      size: AVATAR_SIZES.LARGE
    });
  }

  componentDidUpdate(_olsProps: ProfilePageProps, _newProps: ProfilePageProps) {
    this.generateAvatar(_newProps);
    return true;
  }

  render() {
    return this.compile(template, {});
  }
}

export default withUser(withControllers(ProfilePage, {auth: AuthController}));
