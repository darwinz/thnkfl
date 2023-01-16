import { Client, Account, Databases, Query } from "appwrite";
import { Server } from "../utils/config";

let api = {
  sdk: {},

  provider: () => {
    if (!!api.sdk.keys) {
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
    return api.provider().thanksDB.listDocuments(
      Server.databaseID,
      collectionId,
      [
        Query.limit(1),
        Query.orderDesc('createdAt')
      ]
    );
  },

  updateDocument: (collectionId, documentId, data, permissions) => {
    return api
      .provider()
      .thanksDB.updateDocument(Server.databaseID, collectionId, documentId, data, permissions);
  },

  deleteDocument: (collectionId, documentId) => {
    return api.provider().thanksDB.deleteDocument(Server.databaseID, collectionId, documentId);
  },
};

export default api;
