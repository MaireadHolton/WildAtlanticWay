import { userMemStore } from "./mem/user-mem-store.js";
import { listMemStore } from "./mem/list-mem-store.js";
import { locationMemStore } from "./mem/location-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { listJsonStore } from "./json/list-json-store.js";
import { locationJsonStore } from "./json/location-json-store.js";
import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { listMongoStore } from "./mongo/list-mongo-store.js";
import { locationMongoStore } from "./mongo/location-mongo-store.js";

// method to ezport information to the database
export const db = {
  userStore: null,
  listStore: null,
  locationStore: null,

  // method to initalise the data store type
  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.listStore = listJsonStore;
        this.locationStore = locationJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.listStore = listMongoStore;
        this.locationStore = locationMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.listStore = listMemStore;
        this.locationStore = locationMemStore;
    }
  },
};
