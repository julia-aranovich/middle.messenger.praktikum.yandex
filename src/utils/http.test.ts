import sinon, {SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic} from "sinon";
import {expect} from "chai";
import HTTP from "./http";

describe("HTTP", () => {
  let xhr: SinonFakeXMLHttpRequestStatic,
    instance: HTTP;
  const requests: SinonFakeXMLHttpRequest[] = [];
  const originalXMLHttpRequest = global.XMLHttpRequest;

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    });

    instance = new HTTP("/chats");
  });

  afterEach(() => {
    requests.length = 0;
  });

  after(() => {
    global.XMLHttpRequest = originalXMLHttpRequest;
  });

  it(".get() should send GET request", () => {
    instance.get("/");

    const [request] = requests;

    expect(request.method).to.eq("GET");
  });

  it(".put() should send PUT request with proper payload", () => {
    const payload = {chatId: 1, users: []};
    instance.put("/users", payload);

    const [request] = requests;

    expect(request.method).to.eq("PUT");
    expect(request.requestBody).to.eq(JSON.stringify(payload));
  });

  it(".post() should send POST request with proper payload", () => {
    const payload = {title: "title"};
    instance.post("/", payload);

    const [request] = requests;

    expect(request.method).to.eq("POST");
    expect(request.requestBody).to.eq(JSON.stringify(payload));
  });

  it(".delete() should send DELETE request with proper payload", () => {
    const payload = {chatId: 1};
    instance.delete("/", payload);

    const [request] = requests;

    expect(request.method).to.eq("DELETE");
    expect(request.requestBody).to.eq(JSON.stringify(payload));
  });
});
