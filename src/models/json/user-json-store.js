import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("./src/models/json/users.json"));
db.data = { users: [] };

export const userJsonStore = {
  // method to get all users in the database
  async getAllUsers() {
    await db.read();
    return db.data.users;
  },

  // method to add a user to the database
  async addUser(user) {
    await db.read();
    user._id = v4();
    db.data.users.push(user);
    await db.write();
    return user;
  },

  // method to find a user by id
  async getUserById(id) {
    await db.read();
    return db.data.users.find((user) => user._id === id);
  },

  // method to find a user by email address
  async getUserByEmail(email) {
    await db.read();
    return db.data.users.find((user) => user.email === email);
  },

  // method to delete a user by id
  async deleteUserById(id) {
    await db.read();
    const index = db.data.users.findIndex((user) => user._id === id);
    db.data.users.splice(index, 1);
    await db.write();
  },

  // method to delete all users
  async deleteAll() {
    db.data.users = [];
    await db.write();
  },
};
