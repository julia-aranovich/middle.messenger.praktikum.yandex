import Block from "../../utils/Block";
import Button from "../../components/Button";

import {LOGIN_PAGE} from "../../utils/routes";

import template from "./not_found_page.hbs";

export default class NotFoundPage extends Block {
  init() {
    this.children.loginLink = new Button({
      text: "Назад к чатам",
      secondary: true,
      events: {
        click: () => window.renderPage(LOGIN_PAGE)
      }
    });
  }

  render() {
    return this.compile(template, {});
  }
}
