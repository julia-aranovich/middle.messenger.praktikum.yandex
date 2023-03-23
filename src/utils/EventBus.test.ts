import sinon from "sinon";
import {expect} from "chai";
import EventBus from "./EventBus";

describe("EventBus", () => {
  const listener = sinon.stub();
  const listener2 = sinon.stub();
  let eventBus: EventBus;
  const eventName = "test";

  beforeEach(() => {
    eventBus = new EventBus();
    listener.reset();
    listener2.reset();
  });

  it("should not run listener without subscription", () => {
    eventBus.emit(eventName);

    expect(listener.callCount).to.equal(0);
  });

  it("should not run listener on emit of another event", () => {
    eventBus.on(eventName, listener);
    eventBus.emit("test2");

    expect(listener.callCount).to.equal(0);
  });

  it("should not run listener after subscription deletion", () => {
    eventBus.on(eventName, listener);
    eventBus.off(eventName, listener);

    expect(listener.callCount).to.equal(0);
  });

  it("should throw error if no event found for subscription deletion", () => {
    // @ts-ignore
    const f = () => eventBus.off("test2", listener);

    expect(f).to.throw(Error);
  });

  it("should run listeners on emit of subscribed event", () => {
    eventBus.on(eventName, listener);
    eventBus.on(eventName, listener2);
    eventBus.emit(eventName);

    expect(listener.callCount).to.equal(1);
    expect(listener2.callCount).to.equal(1);
  });

  it("should run listener twice on emit of doubly subscribed event", () => {
    eventBus.on(eventName, listener);
    eventBus.on(eventName, listener);
    eventBus.emit(eventName);

    expect(listener.callCount).to.equal(2);
  });
});
