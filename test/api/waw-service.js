import axios from "axios";

import { maggie, serviceUrl } from "../fixtures.js";

export const WAWService = {
    wawUrl: serviceUrl,

async createUser(user) {
    const res = await axios.post(`${this.wawUrl}/api/users`, user);
    return res.data
 },

async getUser(id) {
  const res = await axios.get(`${this.wawUrl}/api/users/${id}`);
  return res.data;
},

async getAllUsers() {
  try{
    const res = await axios.get(`${this.wawUrl}/api/users`);
   return res.data;
  } catch (e) {
    return null;
  }
},

async deleteAllUsers() {
  const res = await axios.delete(`${this.wawUrl}/api/users`);
  return res.data;
},

async createList(list) {
  const res = await axios.post(`${this.wawUrl}/api/lists`, list);
  return res.data;
},

async deleteAllLists() {
  const response = await axios.delete(`${this.wawUrl}/api/lists`);
  return response.data;
},

async deleteList(id) {
  const response = await axios.delete(`${this.wawUrl}/api/lists/${id}`);
  return response;
},

async getAllLists() {
  const res = await axios.get(`${this.wawUrl}/api/lists`);
  return res.data;
},

async getList(id) {
  const res = await axios.get(`${this.wawUrl}/api/lists/${id}`);
  return res.data;
},

async getAllLocations() {
  const res = await axios.get(`${this.wawUrl}/api/locations`);
  return res.data;
},

async createLocation(id, location) {
  const res = await axios.post(`${this.wawUrl}/api/lists/${id}/locations`, location);
  return res.data;
},

async deleteAllLocations() {
  const response = await axios.delete(`${this.wawUrl}/api/locations`);
  return response.data;
},

async getLocation(id) {
  const res = await axios.get(`${this.wawUrl}/api/locations/${id}`);
  return res.data;
},

async deleteLocation(id) {
  const response = await axios.delete(`${this.wawUrl}/api/locations/${id}`);
  return response;
},

async authenticate(user) {
  const response = await axios.post(`${this.wawUrl}/api/users/authenticate`, user);
  axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
  return response.data;
},

async clearAuth() {
  axios.defaults.headers.common["Authorization"] = "";
},
};
