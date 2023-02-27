import Block from "../../utils/Block";
import Button from "../Button";

import template from "./change_avatar_modal.hbs";
import "./change_avatar_modal.pcss";

export default class ChangeAvatarModal extends Block {
  init() {
    this.children.submitButton = new Button({
      text: "Сохранить",
      events: {
        click: (e: Event): void => {
          e.preventDefault();
          this.hide();
        }
      }
    });
  }

  componentDidMount() {
    super.componentDidMount();
    this.hide();
  }

  render() {
    return this.compile(template, {});
  }
}
