import {expect} from "chai";
import set from "./set";

describe("set function", () => {
  const path = "a.b.c";
  const value = "test value";
  let obj: Record<string, unknown>;

  beforeEach(() => {
    obj = {};
  });

  it("should set a value by path to the object", () => {
    const result = set(obj, path, value);

    expect(result).to.deep.equal({a: {b: {c: value}}});
  });

  it("should return original object", () => {
    const result = set(obj, path, value);
    obj.test2 = "another value";

    expect(result).to.equal(obj);
  });

  it("should return passed object if it\"s is not an object", () => {
    const notAnObject = "string";
    const result = set(notAnObject, path, value);

    expect(result).to.equal(notAnObject);
  });

  it("should throw an error if path is not a string", () => {
    const keypathNotAString = 10;
    // @ts-ignore
    const f = () => set(obj, keypathNotAString, value);

    expect(f).to.throw(Error);
  });
});
