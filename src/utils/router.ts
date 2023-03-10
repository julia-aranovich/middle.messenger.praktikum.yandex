import Block from "./Block";

import isEqual from "../helpers/isEqual";
import {Indexed} from "./types";

export enum Routes {
  CHANGE_PASSWORD_PAGE = "/change-password",
  MESSENGER = "/messenger",
  EDIT_CHAT_PAGE = "/edit-chat",
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
  ) {}

  navigate(pathname: Routes): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    this._block = null;
  }

  match(pathname: string): boolean {
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
      const target = e.currentTarget as Window;
      this._onRoute(target.location.pathname);
    });

    this._onRoute(window.location.pathname as Routes);
  }

  _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      this.go(Routes.NOT_FOUND_PAGE);
    }

    if (this._currentRoute && !isEqual(this._currentRoute, route as Indexed)) {
      this._currentRoute.leave();
    }

    this._currentRoute = route as Route;
    (route as Route).render();
  }

  go(pathname: string): void {
    if (window.location.pathname === pathname) return;
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back():void {
    this.history.back();
  }

  forward():void {
    this.history.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router();
