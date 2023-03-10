import Block from "./Block";

export enum Routes {
  CHANGE_PASSWORD_PAGE = "/change-password",
  CHAT_LIST_PAGE = "/messenger",
  LOGIN_PAGE = "/",
  NOT_FOUND_PAGE = "/not-found",
  PROFILE_PAGE = "/settings",
  REGISTRATION_PAGE = "/sign-up",
  SERVER_ERROR_PAGE = "/oops",
  UPDATE_PROFILE_PAGE = "/edit-settings"
}

class Route<P extends Record<string, any> = any> {
  constructor(
    private _pathname: Routes,
    private _blockClass: typeof Block,
    private _props: P,
    private _block: Block | null = null
  ) { }

  navigate(pathname: Routes): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      this._block.getContent().remove();
    }
  }

  match(pathname: Routes): boolean {
    return pathname === this._pathname;
  }

  render(): void {
    if (!this._block) {
      this._block = new this._blockClass(this._props);
      const root = document.querySelector("#root") as HTMLElement;
      root.innerHTML = "";
      root.appendChild(this._block.getContent());
      this._block.dispatchComponentDidMount();
      return;
    }

    this._block.show();
  }
}

class Router<P extends Record<string, any> = any> {
  routes: Route[] = [];

  history: History = window.history;

  private _currentRoute: Route | null = null;

  private static __instance: Router | null;

  constructor() {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    Router.__instance = this;
  }

  use(pathname: Routes, block: typeof Block<any>, context: P = {} as P): Router {
    const route = new Route(pathname, block, context);
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = ((e: PopStateEvent) => {
      // @ts-ignore
      this._onRoute(e.currentTarget!.location.pathname);
    });

    this._onRoute(window.location.pathname as Routes);
  }

  _onRoute(pathname: Routes): void {
    const route = this.getRoute(pathname);
    if (!route) {
      this.go(Routes.NOT_FOUND_PAGE);
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route as Route;
    (route as Route).render();
  }

  go(pathname: Routes): void {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back():void {
    this.history.back();
  }

  forward():void {
    this.history.forward();
  }

  getRoute(pathname: Routes) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export function withRouter(Component: typeof Block<any>) {
  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-shadow
  return class withRouter extends Component {
    constructor(props: Record<string, any>) {
      super({...props, router: Router});
    }
  };
}

export default new Router();
