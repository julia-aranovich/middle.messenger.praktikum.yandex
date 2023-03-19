import {v4 as makeUUID} from "uuid";
import {TemplateDelegate} from "handlebars";

import EventBus from "./EventBus";

type Children = Record<string, Block | Block[]>;
export default class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  public id = makeUUID();

  private _element: HTMLElement | null = null;

  private eventBus: () => EventBus;

  props: P;

  public children: Children;

  constructor(propsAndChildren: P = {} as P) {
    const {children, props} = this._getChildrenAndProps(propsAndChildren);
    this.children = children;
    this.props = this._makePropsProxy({...props, id: this.id});

    const eventBus = new EventBus();
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildrenAndProps(propsAndChildren: P) {
    const children: Children = {};
    const props: P = {} as P;

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block || (Array.isArray(value) && value[0] instanceof Block)) {
        children[key] = value;
      } else {
        props[key as keyof P] = value;
      }
    });

    return {children, props};
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  private _replaceStub(fragment: HTMLTemplateElement, child: Block) {
    const stub: HTMLElement | null = fragment.content.querySelector(`[data-id="${child.id}"]`);
    if (!stub) {
      return;
    }
    child.getContent()?.append(...Array.from(stub.childNodes));
    stub?.replaceWith(child.getContent());
  }

  protected compile(template: TemplateDelegate, context: any) {
    const contextAndStubs = {...context};

    Object.entries(this.children).forEach(([name, child]) => {
      if (Array.isArray(child)) {
        contextAndStubs[name] = child.map((childEl: Block) => `<div data-id="${childEl.id}"></div>`);
      } else {
        contextAndStubs[name] = `<div data-id="${child.id}"></div>`;
      }
    });

    const fragment = this._createDocumentElement("template") as HTMLTemplateElement;
    fragment.innerHTML = template(contextAndStubs);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((childEl) => {
          this._replaceStub(fragment, childEl);
        });
      } else {
        this._replaceStub(fragment, child);
      }
    });

    return fragment.content;
  }

  private _componentDidMount(): void {
    this.componentDidMount();

    Object.values(this.children).forEach((child: Block | Block[]) => {
      if (Array.isArray(child)) {
        child.forEach((childEl) => {
          childEl.dispatchComponentDidMount();
        });
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  protected componentDidMount(): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: P, newProps: P): void {
    const response: boolean = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  protected componentDidUpdate(_oldProps: P, _newProps: P): boolean {
    return true;
  }

  public setProps = (nextProps: Partial<P>): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element as HTMLElement;
  }

  private _addEvents(): void {
    const {events = {}} = this.props;

    Object.keys(events).forEach((eventName: string) => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents(): void {
    const {events = {}} = this.props;

    Object.keys(events).forEach((eventName: string) => {
      this._element!.removeEventListener(eventName, events[eventName]);
    });
  }

  private _render(): void {
    const fragment = this.render();
    const newElement = (fragment as DocumentFragment).firstElementChild as HTMLElement;
    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
  }

  protected render(): DocumentFragment | null {
    return null;
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: P): P {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as keyof P];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        // the following clone to be improved
        const oldProps = {...target};
        target[prop as keyof P] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }

  _createDocumentElement(tagName: string): HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    const element: HTMLElement = document.createElement(tagName);
    element.setAttribute("data-id", this.id);
    return element;
  }

  show(): void {
    this.getContent()!.style.display = "block";
  }

  hide(): void {
    this.getContent()!.style.display = "none";
  }
}
