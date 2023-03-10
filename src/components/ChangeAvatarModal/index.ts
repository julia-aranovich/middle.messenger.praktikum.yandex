import Block from "../../utils/Block";
import Button from "../Button";

import UserController from "../../controllers/UserController";
import ChatsController from "../../controllers/ChatsController";

import template from "./change_avatar_modal.hbs";
import "./change_avatar_modal.pcss";

interface ChangeAvatarModalProps {
  controller: typeof UserController | typeof ChatsController,
  selectedChatId?: number
}

export default class ChangeAvatarModal extends Block<ChangeAvatarModalProps> {
  init() {
    this.children.submitButton = new Button({
      text: "Сохранить",
      events: {
        click: (e) => this.onSubmit(e)
      }
    });
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    const form = new FormData(document.getElementById("avatarForm") as HTMLFormElement);
    await this.props.controller.updateAvatar(form);
    this.hide();
  }

  componentDidMount() {
    super.componentDidMount();
    this.hide();
  }

  render() {
    return this.compile(template, this.props);
  }
}
