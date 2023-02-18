import Block from "../../utils/Block";

import template from "./avatar.hbs";
import "./avatar.pcss";

export const AVATAR_SIZES = {
  LARGE: "large",
  MEDIUM: "medium",
  REGULAR: "regular"
};

export default class Avatar extends Block {
  render() {
    return this.compile(template, {size: AVATAR_SIZES.REGULAR, ...this.props});
  }
}
