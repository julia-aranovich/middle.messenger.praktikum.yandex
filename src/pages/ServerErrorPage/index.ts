import Block from "../../utils/Block";
import Button from "../../components/Button";

import {LOGIN_PAGE} from "../../utils/routes";

import template from "./server_error_page.hbs";

export default class ServerErrorPage extends Block {
  init() {
    this.children.loginLink = new Button({
      text: "Назад",
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
