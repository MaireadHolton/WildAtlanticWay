import { Location } from "./location.js";
import { List } from "./list.js";

export const locationMongoStore = {
  // method for getting all locations from the database
  async getAllLocations() {
    const locations = await Location.find().lean();
    return locations;
  },

   // method for adding a location to the database
  async addLocation(listId, location) {
    location.listid = listId;
    const newLocation = new Location(location);
    const locationObj = await newLocation.save();
    return this.getLocationById(locationObj._id);
  },

  // method for finding locations within a list from the database
  async getLocationsByListId(id) {
    const locations = await Location.find({ listid: id }).lean();
    return locations;
  },

  // method for finding a location by id from the database
  async getLocationById(id) {
    if (id) {
      const location = await Location.findOne({ _id: id }).lean();
      return location;
    }
    return null;
  },

  // method for deleting a location in the database
  async deleteLocation(id) {
    try {
      await Location.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  // method for deleting all locations in the database
  async deleteAllLocations() {
    await Location.deleteMany({});
  },

   // method for updating a location in the database
  async updateLocation(location, updatedLocation) {
    location.location = updatedLocation.location;
    location.latitude = updatedLocation.latitude;
    location.longitude = updatedLocation.longitude;
    location.date = updatedLocation.date;
    location.detail = updatedLocation.detail;
    await location.save();
  },
};