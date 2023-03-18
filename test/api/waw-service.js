import axios from "axios";

import { maggie, serviceUrl } from "../fixtures.js";

export const WAWService = {
    wawUrl: serviceUrl,

// axios method for creating user  
async createUser(user) {
    const res = await axios.post(`${this.wawUrl}/api/users`, user);
    return res.data
 },

 // axios method for finding a user
async getUser(id) {
  const res = await axios.get(`${this.wawUrl}/api/users/${id}`);
  return res.data;
},

// axios method for finding all users
async getAllUsers() {
  try{
    const res = await axios.get(`${this.wawUrl}/api/users`);
   return res.data;
  } catch (e) {
    return null;
  }
},

// axios method for deleting all users
async deleteAllUsers() {
  const res = await axios.delete(`${this.wawUrl}/api/users`);
  return res.data;
},

// axios method for creating a list
async createList(list) {
  const res = await axios.post(`${this.wawUrl}/api/lists`, list);
  return res.data;
},

// axios method for deleting all lists
async deleteAllLists() {
  const response = await axios.delete(`${this.wawUrl}/api/lists`);
  return response.data;
},

// axios method for deleting a list 
async deleteList(id) {
  const response = await axios.delete(`${this.wawUrl}/api/lists/${id}`);
  return response;
},

// axios method for finding all lists
async getAllLists() {
  const res = await axios.get(`${this.wawUrl}/api/lists`);
  return res.data;
},

// axios method for finding a list 
async getList(id) {
  const res = await axios.get(`${this.wawUrl}/api/lists/${id}`);
  return res.data;
},

// axios method for finding all locations 
async getAllLocations() {
  const res = await axios.get(`${this.wawUrl}/api/locations`);
  return res.data;
},

// axios method for creating a location
async createLocation(id, location) {
  const res = await axios.post(`${this.wawUrl}/api/lists/${id}/locations`, location);
  return res.data;
},

// axios method for deleting all locations 
async deleteAllLocations() {
  const response = await axios.delete(`${this.wawUrl}/api/locations`);
  return response.data;
},

// axios method for finding a location
async getLocation(id) {
  const res = await axios.get(`${this.wawUrl}/api/locations/${id}`);
  return res.data;
},

// axios method for deleting a location
async deleteLocation(id) {
  const response = await axios.delete(`${this.wawUrl}/api/locations/${id}`);
  return response;
},

// axios method to authenticate a user
async authenticate(user) {
  const response = await axios.post(`${this.wawUrl}/api/users/authenticate`, user);
  axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
  return response.data;
},

// axios method for clearing authentication 
async clearAuth() {
  axios.defaults.headers.common["Authorization"] = "";
},
};
