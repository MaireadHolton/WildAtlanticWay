import { List } from "./list.js";
import { locationMongoStore } from "./location-mongo-store.js";

export const listMongoStore = {
   // model to return all lists from the database
  async getAllLists() {
    const lists = await List.find().lean();
    return lists;
  },

  // model for finding a list in the database by id
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

   // model for adding list to the database
  async addList(list) {
    const newList = new List(list);
    const listObj = await newList.save();
    return this.getListById(listObj._id);
  },

  // model for getting a users lists from the database by user id 
  async getUserLists(id) {
    const list = await List.find({ userid: id }).lean();
    return list;
  },

   // model for deleting a list from the database
  async deleteListById(id) {
    try {
      await List.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  // model for deleting all lists in the database
  async deleteAllLists() {
    await List.deleteMany({});
  },

  // model for updating a list in the database
  async updateList(updatedList) {
    const list = await List.findOne({ _id: updatedList._id });
    list.title = updatedList.title;
    list.img = updatedList.img;
    await list.save();
  },
};


