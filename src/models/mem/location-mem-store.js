import { v4 } from "uuid";

let locations = [];

export const locationMemStore = {
  // method for getting all locations
  async getAllLocations() {
    return locations;
  },

  // method for adding a location
  async addLocation(listId, location) {
    location._id = v4();
    location.listid = listId;
    locations.push(location);
    return location;
  },

  // method for finding locations within a list
  async getLocationsByListId(id) {
    return locations.filter((location) => location.listid === id);
  },

  // method for finding a location by id
  async getLocationById(id) {
    return locations.find((location) => location._id === id);
  },

// method for finding locations within a list by list id
  async getListLocations(listId) {
    return locations.filter((location) => location.listid === listId);
  },

  // method for deleting a location 
  async deleteLocation(id) {
    const index = locations.findIndex((location) => location._id === id);
    locations.splice(index, 1);
  },

  // method for deleting all locations
  async deleteAllLocations() {
    locations = [];
  },

   // method for updating a location
  async updateLocation(location, updatedLocation) {
    location.location = updatedLocation.location;
    location.latitude = updatedLocation.latitude;
    location.longitude = updatedLocation.longitude;
    location.date = updatedLocation.date;
    location.details = updatedLocation.details;
  },
};
