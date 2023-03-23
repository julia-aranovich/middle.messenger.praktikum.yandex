import {expect} from "chai";
import isArrayOrObject from "./isArrayOrObject";

describe("isArrayOrObject function", () => {
  it("should accept plain object", () => {
    const result = isArrayOrObject({});
    expect(result).to.be.true;
  });

  it("should accept array", () => {
    const result = isArrayOrObject([]);
    expect(result).to.be.true;
  });

  it("should reject string", () => {
    const result = isArrayOrObject("");
    expect(result).to.be.false;
  });

  it("should reject number", () => {
    const result = isArrayOrObject(0);
    expect(result).to.be.false;
  });

  it("should reject null", () => {
    const result = isArrayOrObject(null);
    expect(result).to.be.false;
  });

  it("should reject class instance", () => {
    class TestClass {
      test: string = "test";
    }
    const result = isArrayOrObject(new TestClass());
    expect(result).to.be.false;
  });

  it("should reject function", () => {
    const result = isArrayOrObject(() => true);
    expect(result).to.be.false;
  });
});
