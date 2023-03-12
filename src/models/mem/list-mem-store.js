import { v4 } from "uuid";
import { locationMemStore } from "./location-mem-store.js";

let lists = [];

export const listMemStore = {
  async getUserLists(userid) {
    return lists.filter((list) => list.userid === userid);
  },

  async getAllLists() {
    return lists;
  },

  async addList(list) {
    list._id = v4();
    lists.push(list);
    return list;
  },

  async getListById(id) {
    const form = lists.find((list) => list._id === id);
    if (form) {
      form.locations = await locationMemStore.getLocationsByListId(form._id);
    return form;
    }
    return null;
  },

  async deleteListById(id) {
    const index = lists.findIndex((list) => list._id === id);
    if (index !== -1) lists.splice(index, 1);
  },

  async deleteAllLists() {
    lists = [];
  },
};