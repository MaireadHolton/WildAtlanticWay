import { User } from "./user.js";

export const userMongoStore = {
  // method to get all users in the database
  async getAllUsers() {
    const users = await User.find().lean();
    return users;
  },

  // method to find a user by id
  async getUserById(id) {
    if (id) {
      const user = await User.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  // method to add a user to the database
  async addUser(user) {
    const newUser = new User(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  // method to find a user by email address
  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  // method to delete a user by id
  async deleteUserById(id) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  // method to delete all users
  async deleteAll() {
    await User.deleteMany({});
  }
};
