import Block from "../utils/Block";

function withControllers(Component: typeof Block<any>, controllers: Record<string, any>) {
  return class WithControllers extends Component {
    constructor(props: Record<string, any>) {
      super({...props, ...controllers});
    }
  };
}

export default withControllers;
