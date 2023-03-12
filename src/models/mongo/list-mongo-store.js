import { List } from "./list.js";
import { locationMongoStore } from "./location-mongo-store.js";

export const listMongoStore = {
  async getAllLists() {
    const lists = await List.find().lean();
    return lists;
  },

  async getListById(id) {
    if (id) {
      const list = await List.findOne({ _id: id }).lean();
      if (list) {
        list.locations = await locationMongoStore.getLocationsByListId(list._id);
      }
      return list;
    }
    return null;
  },

  async addList(list) {
    const newList = new List(list);
    const listObj = await newList.save();
    return this.getListById(listObj._id);
  },

  async getUserLists(id) {
    const list = await List.find({ userid: id }).lean();
    return list;
  },

  async deleteListById(id) {
    try {
      await List.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllLists() {
    await List.deleteMany({});
  }
};
