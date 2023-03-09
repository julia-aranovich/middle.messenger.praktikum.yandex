import Block from "../../utils/Block";

import template from "./button_link.hbs";
import "../Button/button.pcss";

interface ButtonLinkProps {
  to: string,
  text: string,
  disabled?: boolean
}

export default class ButtonLink extends Block<ButtonLinkProps> {
  render() {
    return this.compile(template, this.props);
  }
}
