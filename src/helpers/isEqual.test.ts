import {expect } from "chai";
import isEqual from "./isEqual";

describe("isEqual function", () => {
  const obj1 = {a: {b: {d: 2}}};

  it("should accept equal objects", () => {
    const obj2 = {...obj1};
    const result = isEqual(obj1, obj2);
    expect(result).to.be.true;
  });

  it("should accept empty objects", () => {
    const result = isEqual({}, {});
    expect(result).to.be.true;
  });

  it("should reject objects with different values", () => {
    const obj2 = {...obj1, d: 3};
    const result = isEqual(obj1, obj2);
    expect(result).to.be.false;
  });

  it("should reject objects with different keys count", () => {
    const obj2 = {...obj1, c: 3};
    const result = isEqual(obj1, obj2);
    expect(result).to.be.false;
  });
});
