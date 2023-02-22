import Block from "../../utils/Block";
import Button from "../Button";

import template from "./change_avatar_modal.hbs";
import "./change_avatar_modal.pcss";

interface ChangeAvatarModalProps {
  isVisible?: boolean
}

export default class ChangeAvatarModal extends Block {
  props!: ChangeAvatarModalProps;

  init() {
    this.children.submitButton = new Button({
      text: "Сохранить",
      events: {
        click: (e: Event): void => {
          e.preventDefault();
          this.setProps({isVisible: false});
        }
      }
    });
  }

  render() {
    return this.compile(template, {isVisible: false, ...this.props});
  }
}
