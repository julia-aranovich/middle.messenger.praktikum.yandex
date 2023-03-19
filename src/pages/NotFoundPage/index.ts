import Block from "../../utils/Block";
import Button from "../../components/Button";

import template from "./not_found_page.hbs";
import withRouter from "../../hocs/withRouter";

class NotFoundPage extends Block {
  init() {
    this.children.loginLink = new Button({
      text: "Назад",
      secondary: true,
      events: {
        click: () => this.props.router.back()
      }
    });
  }

  render() {
    return this.compile(template, {});
  }
}

export default withRouter(NotFoundPage);
