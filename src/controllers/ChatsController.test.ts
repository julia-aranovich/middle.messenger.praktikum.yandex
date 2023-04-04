import proxyquire from "proxyquire";
import {expect} from "chai";
import sinon from "sinon";

import type ChatControllerType from "./ChatsController";

const APIMock = {
  create: sinon.stub(),
  read: sinon.stub(),
  addUsers: sinon.stub(),
  deleteUsers: sinon.stub(),
  getUsers: sinon.stub(),
  updateAvatar: sinon.stub(),
  delete: sinon.stub(),
  getToken: sinon.stub()
};

const MessagesControllerMock = {
  connect: sinon.stub()
};

const routerMock = {
  go: sinon.stub()
};

const storeMock = {
  set: sinon.stub()
};

const {default: ChatController} = proxyquire("./ChatsController", {
  "../api/ChatsAPI": {
    default: APIMock
  },
  "./MessagesController": {
    default: MessagesControllerMock
  },
  "../utils/navigation": {
    default: routerMock
  },
  "../utils/storage": {
    default: storeMock
  }
}) as {default: typeof ChatControllerType};

describe("ChatsController", () => {
  let ChatsControllertMock: ChatControllerType;
  const chatsPath = "chats";
  const chatUsersPath = "selectedChatUsers";
  const selectedChatPath = "selectedChatId";
  const title = "title";
  const chatId = 123;
  const userId = 345;
  const mockedChatsEmpty: Array<unknown> = [];
  const mockedChats: Array<unknown> = [{id: chatId}];
  const mockedUsers: Array<unknown> = [];
  const mockedToken = "token";
  const invalidFilter = {test: "test"};

  beforeEach(() => {
    ChatsControllertMock = new ChatController();
    APIMock.read.reset();
    APIMock.read.withArgs(undefined).returns(mockedChatsEmpty);
    APIMock.read.withArgs({title}).returns(mockedChats);
    APIMock.read.withArgs(invalidFilter).throws();
    APIMock.getUsers.reset();
    APIMock.getUsers.withArgs(chatId).returns(mockedUsers);
    APIMock.getToken.reset();
    APIMock.getToken.withArgs(chatId).returns(mockedToken);
    storeMock.set.reset();
    MessagesControllerMock.connect.reset();
  });

  it(".createChat() should call API.create() with passed title", async () => {
    await ChatsControllertMock.createChat(title);

    expect(APIMock.create.calledWith(title)).to.eq(true);
    expect(APIMock.read.calledWith(undefined)).to.eq(true);
    expect(storeMock.set.calledWith(chatsPath, mockedChatsEmpty)).to.eq(true);
    expect(storeMock.set.callCount).to.eq(1); // check there was no error when creating chat
  });

  it(".addUserToChat() should call API.addUsers() with passed args", async () => {
    await ChatsControllertMock.addUserToChat(chatId, userId);

    expect(APIMock.addUsers.calledWith(chatId, [userId])).to.eq(true);
    expect(APIMock.getUsers.calledWith(chatId)).to.eq(true);
    expect(storeMock.set.calledWith(chatUsersPath, mockedUsers)).to.eq(true);
    expect(storeMock.set.callCount).to.eq(1); // check there was no error when adding user
  });

  it(".deleteUserFromChat() should call API.deleteUsers() with passed args", async () => {
    await ChatsControllertMock.deleteUserFromChat(chatId, userId);

    expect(APIMock.deleteUsers.calledWith(chatId, [userId])).to.eq(true);
    expect(APIMock.getUsers.calledWith(chatId)).to.eq(true);
    expect(storeMock.set.calledWith(chatUsersPath, mockedUsers)).to.eq(true);
    expect(storeMock.set.callCount).to.eq(1); // check there was no error when deleting user
  });

  it(".deleteChat() should call API.delete() with passed chat id", async () => {
    await ChatsControllertMock.deleteChat(chatId);

    expect(APIMock.delete.calledWith(chatId)).to.eq(true);
    expect(APIMock.read.calledWith(undefined)).to.eq(true);
    expect(storeMock.set.calledWith(chatsPath, mockedChatsEmpty)).to.eq(true);
    expect(storeMock.set.calledWith(selectedChatPath, undefined)).to.eq(true);
    expect(routerMock.go.calledWith("/messenger")).to.eq(true);
    expect(storeMock.set.callCount).to.eq(2); // check there was no error when deleting chat
  });

  it(".selectChat() should call API.getUsers() with passed chat id", async () => {
    await ChatsControllertMock.selectChat(chatId);

    expect(APIMock.getUsers.calledWith(chatId)).to.eq(true);
    expect(storeMock.set.calledWith(selectedChatPath, chatId)).to.eq(true);
    expect(storeMock.set.calledWith(chatUsersPath, mockedUsers)).to.eq(true);
    expect(storeMock.set.callCount).to.eq(2); // check there was no error when selecting chat
  });

  it(".getToken() should call API.getToken() with passed chat id", async () => {
    const token = await APIMock.getToken(chatId);

    expect(token).to.eq(mockedToken);
    expect(storeMock.set.callCount).to.eq(0); // check there was no error when getting token
  });

  it(".getAvatar() should call API.updateAvatar() with passed args", async () => {
    await ChatsControllertMock.updateAvatar({} as FormData);

    expect(APIMock.updateAvatar.callCount).to.eq(1);
    expect(APIMock.read.calledWith(undefined)).to.eq(true);
    expect(storeMock.set.calledWith(chatsPath, mockedChatsEmpty)).to.eq(true);
    expect(storeMock.set.callCount).to.eq(1); // check there was no error when updating avatar
  });

  it(".fetchChats() should open WS connections for each chat", async () => {
    await ChatsControllertMock.fetchChats({title});

    expect(APIMock.read.calledWith({title})).to.eq(true);
    expect(APIMock.getToken.calledWith(chatId)).to.eq(true);
    expect(MessagesControllerMock.connect.calledWith(chatId, mockedToken)).to.eq(true);
    expect(storeMock.set.calledWith(chatsPath, mockedChats)).to.eq(true);
    expect(storeMock.set.callCount).to.eq(1); // check there was no error when fetching chats
  });

  it(".fetchChats() should throw error when fetching with invalid filter", async () => {
    await ChatsControllertMock.fetchChats(invalidFilter);

    expect(APIMock.read.callCount).to.eq(1);
    expect(APIMock.getToken.callCount).to.eq(0);
    expect(MessagesControllerMock.connect.callCount).to.eq(0);
    expect(storeMock.set.calledWith(chatsPath, mockedChatsEmpty)).to.eq(false);
    expect(storeMock.set.callCount).to.eq(1); // check there was error when fetching chats
  });
});
