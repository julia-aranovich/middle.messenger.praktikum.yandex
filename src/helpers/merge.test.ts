import {expect} from "chai";
import merge from "./merge";

describe("merge function", () => {
  it("should merge two objects", () => {
    const obj1 = {a: {b: {d: 2}}};
    const obj2 = {a: {b: {c: 3}}};
    const result = merge(obj1, obj2);
    expect(result).to.deep.equal({a: {b: {c: 3, d: 2}}});
  });

  it("should throw an error if any passed argument is not an object", () => {
    const notAnObject = 10;
    // @ts-ignore
    const f = () => merge(notAnObject, {});

    expect(f).to.throw(Error);
  });
});
