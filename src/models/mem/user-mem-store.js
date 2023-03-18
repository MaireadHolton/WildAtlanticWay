import { v4 } from "uuid";

let users = [];

export const userMemStore = {
  // method to get all users
  async getAllUsers() {
    return users;
  },

  // method to add a user
  async addUser(user) {
    user._id = v4();
    users.push(user);
    return user;
  },

  // method to find a user by id
  async getUserById(id) {
    let u = users.find((user) => user._id === id);
    if (u === undefined) u = null;
    return u;
  },

 // method to find a user by email address
  async getUserByEmail(email) {
    let u = users.find((user) => user.email === email);
    if (u === undefined) u = null;
    return u;
  },

  // method to delete a user by id
  async deleteUserById(id) {
    const index = users.findIndex((user) => user._id === id);
    if (index!== -1) users.splice(index, 1);
  },

  // method to delete all users
  async deleteAll() {
    users = [];
  },
};
