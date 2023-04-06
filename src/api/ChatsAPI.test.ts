import sinon, {SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic} from "sinon";
import {expect} from "chai";
import {ChatsAPI} from "./ChatsAPI";
import HTTP from "../utils/http";

describe("ChatsAPI", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  const API = new ChatsAPI();
  const requests: SinonFakeXMLHttpRequest[] = [];
  const originalXMLHttpRequest = global.XMLHttpRequest;
  const chatId = 123;
  const users: number[] = [123, 345, 567];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    });
  });

  afterEach(() => {
    requests.length = 0;
  });

  after(() => {
    global.XMLHttpRequest = originalXMLHttpRequest;
  });

  it("should send requests to \"chats\" endpoint", () => {
    API.read();
    const [request] = requests;
    expect(request.url).to.equal(`${HTTP.API_URL}/chats/`);
  });

  it(".read() should send GET request", () => {
    API.read();
    const payload = {test: "test"};
    API.read(payload);
    const [request, requestWithPayload] = requests;

    expect(request.method).to.equal("GET");
    expect(request.url).to.equal(`${HTTP.API_URL}/chats/`);
    expect(request.requestBody).to.be.undefined;
    expect(requestWithPayload.method).to.equal("GET");
    expect(requestWithPayload.url).to.equal(`${HTTP.API_URL}/chats/?test=test`);
    expect(requestWithPayload.requestBody).to.be.undefined;
  });

  it(".create() should send POST request with passed chat title", () => {
    const title = "title";
    API.create(title);
    const [request] = requests;

    expect(request.method).to.equal("POST");
    expect(request.requestBody).to.equal(JSON.stringify({title}));
  });

  it(".delete() should send DELETE request", () => {
    API.delete(chatId);
    const [request] = requests;

    expect(request.method).to.equal("DELETE");
    expect(request.requestBody).to.equal(JSON.stringify({chatId}));
  });

  it(".getUsers() should send GET request", () => {
    API.getUsers(chatId);
    const [request] = requests;

    expect(request.method).to.equal("GET");
    expect(request.url).to.equal(`${HTTP.API_URL}/chats/${chatId}/users`);
  });

  it(".addUsers() should send PUT request", () => {
    API.addUsers(chatId, users);
    const [request] = requests;

    expect(request.method).to.equal("PUT");
    expect(request.url).to.equal(`${HTTP.API_URL}/chats/users`);
    expect(request.requestBody).to.equal(JSON.stringify({chatId, users}));
  });

  it(".deleteUsers() should send DELETE request", () => {
    API.deleteUsers(chatId, users);
    const [request] = requests;

    expect(request.method).to.equal("DELETE");
    expect(request.url).to.equal(`${HTTP.API_URL}/chats/users`);
    expect(request.requestBody).to.equal(JSON.stringify({ chatId, users }));
  });

  it(".updateAvatar() should send PUT request", () => {
    API.updateAvatar({} as FormData);
    const [request] = requests;

    expect(request.method).to.equal("PUT");
    expect(request.url).to.equal(`${HTTP.API_URL}/chats/avatar`);
    expect(request.requestBody).to.equal(JSON.stringify({}));
  });

  it(".getToken() should send POST request", () => {
    API.getToken(chatId);
    const [request] = requests;

    expect(request.method).to.equal("POST");
    expect(request.url).to.equal(`${HTTP.API_URL}/chats/token/${chatId}`);
  });
});
