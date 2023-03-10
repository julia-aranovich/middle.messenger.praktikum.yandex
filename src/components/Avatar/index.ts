import Block from "../../utils/Block";

import template from "./avatar.hbs";
import "./avatar.pcss";

export const AVATAR_SIZES = {
  LARGE: "large",
  MEDIUM: "medium",
  REGULAR: "regular"
};

interface AvatarProps {
  title: string,
  avatar?: string,
  size?: string
}

export default class Avatar extends Block<AvatarProps> {
  render() {
    return this.compile(template, {
      size: this.props.size || AVATAR_SIZES.REGULAR,
      avatar: this.props.avatar &&
        `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}`,
      title: this.props.title.toUpperCase()
    });
  }
}
