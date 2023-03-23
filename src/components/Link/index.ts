import Block from "../../utils/Block";

import template from "./link.hbs";
import "../Button/button.pcss";

import withRouter, {PropsWithRouter} from "../../hocs/withRouter";

interface LinkProps extends PropsWithRouter {
  to: string,
  text: string,
  compact?: boolean,
  events?: {
    click: () => void
  }
}

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: () => this.navigate()
      }
    });
  }

  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withRouter(Link);
