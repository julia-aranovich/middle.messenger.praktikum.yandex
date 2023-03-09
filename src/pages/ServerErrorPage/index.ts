import Block from "../../utils/Block";
import Button from "../../components/Button";
import Router from "../../utils/Router";

import template from "./server_error_page.hbs";

export default class ServerErrorPage extends Block {
  init() {
    this.children.loginLink = new Button({
      text: "Назад",
      secondary: true,
      events: {
        click: () => Router.back()
      }
    });
  }

  render() {
    return this.compile(template, {});
  }
}
