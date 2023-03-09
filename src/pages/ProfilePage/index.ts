import Block from "../../utils/Block";

import Button from "../../components/Button";
import ButtonLink from "../../components/ButtonLink";
import Field, {FieldProps} from "../../components/Field";
import Form from "../../components/Form";
import Avatar, {AVATAR_SIZES} from "../../components/Avatar";

import {Routes} from "../../utils/Router";
import PAGE_FIELDS from "../../utils/fields";

import template from "./profile_page.hbs";
import ChangeAvatarModal from "../../components/ChangeAvatarModal";

export interface ProfilePageProps {
  email: string,
  login: string,
  display_name?: string,
  first_name?: string,
  second_name?: string,
  phone?: string
}

export default class ProfilePage extends Block<ProfilePageProps> {
  init() {
    this.children.avatar = new Avatar({
      title: this.props.first_name,
      size: AVATAR_SIZES.LARGE
    });
    this.children.changeAvatarModal = new ChangeAvatarModal();
    this.children.chageAvatarLink = new Button({
      text: "Загрузить фото",
      secondary: true,
      events: {
        click: () => (this.children.changeAvatarModal as Block).show()
      }
    });
    this.children.form = new Form({
      actions: [
        new ButtonLink({
          to: Routes.UPDATE_PROFILE_PAGE,
          text: "Изменить данные"
        }),
        new ButtonLink({
          to: Routes.CHANGE_PASSWORD_PAGE,
          text: "Изменить пароль"
        }),
        new ButtonLink({
          to: Routes.CHAT_LIST_PAGE,
          text: "Назад к чатам"
        }),
        new ButtonLink({
          to: Routes.LOGIN_PAGE,
          text: "Выйти"
        })
      ],
      fields: PAGE_FIELDS[Routes.PROFILE_PAGE].map((field: FieldProps): Block => new Field({
        ...field,
        disabled: true,
        value: this.props[field.name as keyof ProfilePageProps]
      }))
    });
  }

  render() {
    return this.compile(template, {});
  }
}
