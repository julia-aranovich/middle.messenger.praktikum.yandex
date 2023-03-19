import Block from "../utils/Block";
import router from "../utils/navigation";

export default function withRouter(Component: typeof Block<any>) {
  return class WithRouter extends Component {
    constructor(props: Record<string, any>) {
      super({...props, router});
    }
  };
}

export interface PropsWithRouter {
  router: typeof router;
}
