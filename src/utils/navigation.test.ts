import {expect} from "chai";
import sinon from "sinon";

import Router, {Routes} from "./navigation";
import Block from "./Block";

interface BlockConstructable<P extends Record<string, any> = any> {
  new(props: P): Block<P>;
}

describe("Router", () => {
  const originalHistoryBack = global.window.history.back;
  const originalHistoryForward = global.window.history.forward;

  before(() => {
    global.window.history.back = () => {
      if (typeof window.onpopstate === "function") {
        window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
      }
    };
    global.window.history.forward = () => {
      if (typeof window.onpopstate === "function") {
        window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
      }
    };
  });

  after(() => {
    global.window.history.back = originalHistoryBack;
    global.window.history.forward = originalHistoryForward;
  });

  const getContentFake = sinon.fake.returns(document.createElement("div"));

  const BlockMock = class {
    getContent = getContentFake;

    dispatchComponentDidMount = () => {};

    show = () => {};
  } as unknown as BlockConstructable<any>;

  it("use() should return Router instance", () => {
    // @ts-ignore
    const result = Router.use(Routes.LOGIN_PAGE, BlockMock);

    expect(result).to.eq(Router);
  });

  it("should render a page on start", () => {
    Router
      // @ts-ignore
      .use(Routes.LOGIN_PAGE, BlockMock)
      .start();

    expect(getContentFake.callCount).to.eq(1);
  });

  it("should render a page on history back action", () => {
    Router
      // @ts-ignore
      .use(Routes.LOGIN_PAGE, BlockMock)
      .start();

    Router.back();

    expect(getContentFake.callCount).to.eq(1);
  });

  it("should render a page on history forward action", () => {
    Router
      // @ts-ignore
      .use(Routes.LOGIN_PAGE, BlockMock)
      .start();

    Router.forward();

    expect(getContentFake.callCount).to.eq(1);
  });

  it("should render a page with .go()", () => {
    Router
      // @ts-ignore
      .use(Routes.LOGIN_PAGE, BlockMock)
      // @ts-ignore
      .use(Routes.MESSENGER, BlockMock)
      .start();

    Router.go(Routes.MESSENGER);

    expect(getContentFake.callCount).to.eq(2);
  });
});
