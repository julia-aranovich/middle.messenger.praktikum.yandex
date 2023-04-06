import {expect} from "chai";
import Block from "./Block";

describe("Block", () => {
  let ComponentMock: typeof Block,
    ComponentMockWithRender: typeof Block,
    isCalled: boolean;
  const testString = "test";

  beforeEach(() => {
    isCalled = false;
    ComponentMock = class extends Block {};
    ComponentMockWithRender = class extends Block {
      render() {
        const fragment = new DocumentFragment();
        const div = document.createElement("div");
        div.textContent = testString;
        fragment.append(div);
        return fragment;
      }
    };
  });

  it("should run protected init on initialization", () => {
    ComponentMock = class extends ComponentMockWithRender {
      init() {
        isCalled = true;
      }
    };
    const component = new ComponentMock({});

    expect(isCalled).to.be.true;
    expect(component.getContent().textContent).to.equal(testString);
  });

  it("should run protected componentDidMount on CDM dispatch", () => {
    ComponentMock = class extends Block {
      componentDidMount() {
        isCalled = true;
      }
    };
    const component = new ComponentMock({});
    component.dispatchComponentDidMount();

    expect(isCalled).to.be.true;
  });

  it("should be visible on .show()", () => {
    const component = new ComponentMockWithRender({});
    component.show();

    expect(component.getContent().style.display).to.equal("block");
  });

  it("should be hidden on .hide()", () => {
    const component = new ComponentMockWithRender({});
    component.hide();

    expect(component.getContent().style.display).to.equal("none");
  });

  it("should run protected componentDidUpdate on .setProps()", () => {
    ComponentMock = class extends Block {
      componentDidUpdate() {
        isCalled = true;
        return true;
      }
    };
    const component = new ComponentMock({});
    component.setProps({test: testString});

    expect(isCalled).to.be.true;
  });

  it("should throw error when trying to delete component props", () => {
    const component = new ComponentMock({test: testString});
    const f = () => {
      // @ts-ignore
      delete component.props.test;
    };

    expect(f).to.throw(Error);
  });

  it("should re-render on props change specified in protected componentDidUpdate", () => {
    const propA = "propA";
    const propB = "propB";
    ComponentMock = class extends Block {
      // @ts-ignore
      componentDidUpdate(oldProps, newProps) {
        return oldProps.propA !== newProps.propA;
      }

      render() {
        const fragment = new DocumentFragment();
        const div = document.createElement("div");
        div.textContent = this.props.propB;
        fragment.append(div);
        return fragment;
      }
    };

    const component = new ComponentMock({propA, propB});
    expect(component.getContent().textContent).to.equal(propB);

    component.setProps({propA, propB: "propB_new"});
    expect(component.getContent().textContent).to.equal(propB);
  });

  it("should recognize props and children in object passed to constructor", () => {
    const child = new Block({});
    const propsObj = {test: testString};
    const childrenObj = {button: child};
    const component = new ComponentMock({...propsObj, ...childrenObj});

    expect(component.props).to.include(propsObj);
    expect(component.props).to.not.include(childrenObj);
    expect(component.children).to.not.include(propsObj);
    expect(component.children).to.include(childrenObj);
  });
});
