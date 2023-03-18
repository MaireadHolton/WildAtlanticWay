import { v4 } from "uuid";
import { locationMemStore } from "./location-mem-store.js";

let lists = [];

export const listMemStore = {
  // model for getting a users lists by user id 
  async getUserLists(userid) {
    return lists.filter((list) => list.userid === userid);
  },

   // model to return all lists
  async getAllLists() {
    return lists;
  },

   // model for adding list
  async addList(list) {
    list._id = v4();
    lists.push(list);
    return list;
  },

  // model for finding a list by id
  async getListById(id) {
    const form = lists.find((list) => list._id === id);
    if (form) {
      form.locations = await locationMemStore.getLocationsByListId(form._id);
    return form;
    }
    return null;
  },

   // model for deleting a list
  async deleteListById(id) {
    const index = lists.findIndex((list) => list._id === id);
    if (index !== -1) lists.splice(index, 1);
  },

  // model for deleting all lists in the database
  async deleteAllLists() {
    lists = [];
  },
};