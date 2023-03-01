import Block from "../../utils/Block";

import template from "./avatar.hbs";
import "./avatar.pcss";

export const AVATAR_SIZES = {
  LARGE: "large",
  MEDIUM: "medium",
  REGULAR: "regular"
};

interface AvatarProps {
  title?: string,
  size?: string
}

export default class Avatar extends Block<AvatarProps> {
  render() {
    return this.compile(template, {size: AVATAR_SIZES.REGULAR, ...this.props});
  }
}
