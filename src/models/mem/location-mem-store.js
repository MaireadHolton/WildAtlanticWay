import { v4 } from "uuid";

let locations = [];

export const locationMemStore = {
  async getAllLocations() {
    return locations;
  },

  async addLocation(listId, location) {
    location._id = v4();
    location.listid = listId;
    locations.push(location);
    return location;
  },

  async getLocationsByListId(id) {
    return locations.filter((location) => location.listid === id);
  },

  async getLocationById(id) {
    return locations.find((location) => location._id === id);
  },

  async getListLocations(listId) {
    return locations.filter((location) => location.listid === listId);
  },

  async deleteLocation(id) {
    const index = locations.findIndex((location) => location._id === id);
    locations.splice(index, 1);
  },

  async deleteAllLocations() {
    locations = [];
  },

  async updateLocation(location, updatedLocation) {
    location.location = updatedLocation.location;
    location.latitude = updatedLocation.latitude;
    location.longitude = updatedLocation.longitude;
    location.date = updatedLocation.date;
    location.details = updatedLocation.details;
    location.pictures = updatedLocation.pictures;
  },
};
