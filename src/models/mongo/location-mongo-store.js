import { Location } from "./location.js";
import { List } from "./list.js";

export const locationMongoStore = {
  async getAllLocations() {
    const locations = await Location.find().lean();
    return locations;
  },

  async addLocation(listId, location) {
    location.listid = listId;
    const newLocation = new Location(location);
    const locationObj = await newLocation.save();
    return this.getLocationById(locationObj._id);
  },

  async getLocationsByListId(id) {
    const locations = await Location.find({ listid: id }).lean();
    return locations;
  },

  async getLocationById(id) {
    if (id) {
      const location = await Location.findOne({ _id: id }).lean();
      return location;
    }
    return null;
  },

  async deleteLocation(id) {
    try {
      await Location.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllLocations() {
    await Location.deleteMany({});
  },

  async updateLocation(location, updatedLocation) {
    location.location = updatedLocation.location;
    location.latitude = updatedLocation.latitude;
    location.longitude = updatedLocation.longitude;
    location.date = updatedLocation.date;
    location.detail = updatedLocation.detail;
    location.pictures = updatedLocation.pictures;
    await location.save();
  },
};