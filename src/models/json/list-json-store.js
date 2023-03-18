import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { locationJsonStore } from "./location-json-store.js";

const db = new Low(new JSONFile("./src/models/json/lists.json"));
db.data = { lists: [] };


export const listJsonStore = {
  // model to return all lists from the database
  async getAllLists() {
    await db.read();
    return db.data.lists;
  },

  // model for adding list to the database
  async addList(list) {
    await db.read();
    list._id = v4();
    db.data.lists.push(list);
    await db.write();
    return list;
  },

  // model for finding a list in the database by id
  async getListById(id) {
    await db.read();
    let list1 = db.data.lists.find((list) => list._id === id);
    if (list1) {
      list1.locations = await locationJsonStore.getLocationsByListId(list._id);
    } else {
      list1 = null;
    }
    return list1;
  },

 // model for getting a users lists from the database by user id 
  async getUserLists(userid) {
    await db.read();
    return db.data.lists.filter((list) => list.userid === userid);
  },

  // model for deleting a list from the database
  async deleteListById(id) {
    await db.read();
    const index = db.data.lists.findIndex((list) => list._id === id);
    if (index !== -1) db.data.lists.splice(index, 1);
    await db.write();
  },

  // model for deleting all lists in the database
  async deleteAllLists() {
    db.data.lists = [];
    await db.write();
  },
};
