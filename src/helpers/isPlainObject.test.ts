import {expect} from "chai";
import isPlainObject from "./isPlainObject";

describe("isPlainObject function", () => {
  it("should accept plain object", () => {
    const result = isPlainObject({});
    expect(result).to.be.true;
  });

  it("should reject array", () => {
    const result = isPlainObject([]);
    expect(result).to.be.false;
  });

  it("should reject string", () => {
    const result = isPlainObject("");
    expect(result).to.be.false;
  });

  it("should reject number", () => {
    const result = isPlainObject(0);
    expect(result).to.be.false;
  });

  it("should reject null", () => {
    const result = isPlainObject(null);
    expect(result).to.be.false;
  });

  it("should reject class instance", () => {
    class TestClass {
      test: string = "test";
    }
    const result = isPlainObject(new TestClass());
    expect(result).to.be.false;
  });

  it("should reject function", () => {
    const result = isPlainObject(() => true);
    expect(result).to.be.false;
  });
});
