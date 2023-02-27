import Block from "../../utils/Block";

import Button from "../../components/Button";
import Field, {FieldProps} from "../../components/Field";
import Form from "../../components/Form";
import Avatar, {AVATAR_SIZES} from "../../components/Avatar";

import {
  CHANGE_PASSWORD_PAGE, CHAT_LIST_PAGE, LOGIN_PAGE, PROFILE_PAGE, UPDATE_PROFILE_PAGE
} from "../../utils/routes";
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

export default class ProfilePage extends Block {
  props!: ProfilePageProps;

  init() {
    this.children.avatar = new Avatar({
      title: this.props.first_name,
      size: AVATAR_SIZES.LARGE
    });
    this.children.chageAvatarLink = new Button({
      text: "Загрузить фото",
      secondary: true,
      events: {
        click: () => this.children.changeAvatarModal.show()
      }
    });
    this.children.form = new Form({
      children: {
        actions: [
          new Button({
            text: "Изменить данные",
            secondary: true,
            events: {
              click: () => window.renderPage(UPDATE_PROFILE_PAGE)
            }
          }),
          new Button({
            text: "Изменить пароль",
            secondary: true,
            events: {
              click: () => window.renderPage(CHANGE_PASSWORD_PAGE)
            }
          }),
          new Button({
            text: "Назад к чатам",
            secondary: true,
            events: {
              click: () => window.renderPage(CHAT_LIST_PAGE)
            }
          }),
          new Button({
            text: "Выйти",
            secondary: true,
            events: {
              click: () => window.renderPage(LOGIN_PAGE)
            }
          })
        ],
        fields: PAGE_FIELDS[PROFILE_PAGE].map((field: FieldProps): Block => new Field({
          ...field,
          disabled: true,
          value: this.props[field.name as keyof ProfilePageProps]
        }))
      }
    });
    this.children.changeAvatarModal = new ChangeAvatarModal();
  }

  render() {
    return this.compile(template, {});
  }
}
