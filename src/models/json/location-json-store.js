import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("./src/models/json/locations.json"));
db.data = { locations: [] };

export const locationJsonStore = {
  // method for getting all locations from the database
  async getAllLocations() {
    await db.read();
    return db.data.locations;
  },

  // method for adding a location to the database
  async addLocation(listId, location) {
    await db.read();
    location._id = v4();
    location.listid = listId;
    db.data.locations.push(location);
    await db.write();
    return location;
  },

  // method for finding locations within a list from the database
  async getLocationsByListId(id) {
    await db.read();
    return db.data.locations.filter((location) => location.listid === id);
  },

  // method for finding a location by id from the database
  async getLocationById(id) {
    await db.read();
    return db.data.locations.find((location) => location._id === id);
  },

  // method for deleting a location in the database
  async deleteLocation(id) {
    await db.read();
    const index = db.data.locations.findIndex((location) => location._id === id);
    db.data.locations.splice(index, 1);
    await db.write();
  },

  // method for deleting all locations in the database
  async deleteAllLocations() {
    db.data.locations = [];
    await db.write();
  },

  // method for updating a location in the database
  async updateLocation(location, updatedLocation) {
    location.location = updatedLocation.location;
    location.latitude = updatedLocation.latitude;
    location.longitude = updatedLocation.longitude;
    location.date = updatedLocation.date;
    location.details = updatedLocation.details;
    await db.write();
  },
};
