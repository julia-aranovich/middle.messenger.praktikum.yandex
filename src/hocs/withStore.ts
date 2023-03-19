import isEqual from "../helpers/isEqual";
import Block from "../utils/Block";
import store, {StoreEvents, State} from "../utils/storage";

const withStore = (mapStateToProps: (state: State) => any) => (Component: typeof Block<any>) => {
  let propsFromState: any;
  return class WithStore extends Component {
    constructor(props: Record<string, any>) {
      propsFromState = mapStateToProps(store.getState());
      super({...props, ...propsFromState});

      store.on(StoreEvents.Updated, (newState) => {
        const newPropsFromState = mapStateToProps(newState);
        if (!isEqual(propsFromState, newPropsFromState)) {
          this.setProps({...newPropsFromState});
        }
        propsFromState = {...newPropsFromState};
      });
    }
  };
};

export default withStore;
