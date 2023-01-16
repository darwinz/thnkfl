import { Client, Account, Databases } from "appwrite";
import { Server } from "../utils/config";

let api = {
  sdk: {},

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }

    let client = new Client();
    let account = new Account(client);
    let thanksDatabase = new Databases(client);
    client.setEndpoint(Server.endpoint).setProject(Server.project);

    api.sdk.account = account;
    api.sdk.thanksDB = thanksDatabase;

    return api.sdk;
  },

  createAccount: (email, password, name) => {
    return api.provider().account.create('unique()', email, password, name);
  },

  getAccount: () => {
    return api.provider().account.get();
  },

  createSession: (email, password) => {
    return api.provider().account.createEmailSession(email, password);
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession('current');
  },

  createDocument: (collectionId, data, read, write) => {
    return api
      .provider()
      .thanksDB.createDocument(Server.databaseID, collectionId, 'unique()', data, [read, write]);
  },

  listDocuments: (collectionId, queries = []) => {
    return api.provider().thanksDB.listDocuments(Server.databaseID, collectionId, queries);
  },

  getMostRecentDocument: (collectionId) => {
    return api.provider().thanksDB.listDocuments(Server.databaseID, collectionId, [1, 0, 'lastId']);
  },

  updateDocument: (collectionId, documentId, data, read, write) => {
    return api
      .provider()
      .thanksDB.updateDocument(Server.databaseID, collectionId, documentId, data, [read, write]);
  },

  deleteDocument: (collectionId, documentId) => {
    return api.provider().thanksDB.deleteDocument(Server.databaseID, collectionId, documentId);
  },
};

export default api;
