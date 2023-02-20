import {v4 as makeUUID} from "uuid";

import EventBus from "./EventBus";
import {Props} from "./types";

type Children = Record<string, Block>;
export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  public id = makeUUID();

  private _element: HTMLElement | null = null;

  private eventBus: () => EventBus;

  props: Props;

  public children: Children;

  constructor(propsAndChildren: Props = {}) {
    const {children, props} = this._getChildren(propsAndChildren);
    this.children = children;
    this.props = this._makePropsProxy({ ...props, id: this.id});

    const eventBus = new EventBus();
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildren(propsAndChildren: Props) {
    const children: Children = {};
    const props: Props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return {children, props};
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    // @ts-ignore Miss args declaration here, just context binding
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

  protected compile(template: (props: Props) => string, props: Props) {
    const propsAndStubs: Props = {...props};

    Object.entries(this.children).forEach(([name, child]: [string, Block | Block[]]) => {
      if (Array.isArray(child)) {
        propsAndStubs[name] = child.map((childEl: Block) => `<div data-id="${childEl.id}"></div>`);
      } else {
        propsAndStubs[name] = `<div data-id="${child.id}"></div>`;
      }
    });

    const fragment = this._createDocumentElement("template") as HTMLTemplateElement;
    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach((child: Block | Block[]) => {
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

  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    const response: boolean = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentDidUpdate(_oldProps: Props, _newProps: Props): boolean {
    return true;
  }

  public setProps = (nextProps: Props): void => {
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
    const fragment = this.render() as unknown as HTMLTemplateElement;
    const newElement = fragment.firstElementChild as HTMLElement;
    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
  }

  protected render() {}

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: Props): ProxyHandler<Props> {
    const self = this;

    return new Proxy(props, {
      get(target: Props, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: Props, prop: string, value) {
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
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
