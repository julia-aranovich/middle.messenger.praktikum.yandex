import sinon from "sinon";
import {expect} from "chai";
import {Link} from "./index";
import Router from "../../utils/navigation";

describe("Link", () => {
  const to = "/";
  const text = "Click me";
  const callback = sinon.stub();
  const router = {go: callback} as unknown as typeof Router;

  beforeEach(() => {
    callback.reset();
  });

  it("should render", () => {
    // eslint-disable-next-line no-new
    new Link({to, text, router});
  });

  it("should render passed label", () => {
    const link = new Link({to, text, router});

    expect(link.getContent()?.textContent).to.equal(text);
  });

  it("should call Router.go with passed route on click", () => {
    const link = new Link({to, text, router});
    link.getContent()?.click();

    expect(callback.calledWith(to)).to.be.true;
  });

  it("should return <a/> element", () => {
    const link = new Link({to, text, router});
    const element = link.getContent();

    expect(element).to.be.instanceof(window.HTMLAnchorElement);
    expect(element.className).to.equal("button secondary");
  });

  it("should not have classes for <a/> element", () => {
    const link = new Link({
      to,
      text,
      router,
      compact: true
    });
    const element = link.getContent();

    expect(element.className).to.equal("");
  });
});
