import { db } from "../models/db.js";
import { ListSpec } from "../models/joi-schemas.js";

export const dashboardController = {
  // method to display the dashboard of the logged in user
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const lists = await db.listStore.getUserLists(loggedInUser._id);
      const viewData = {
        title: "myWildAtlanticWay Dashboard",
        user: loggedInUser,
        lists: lists,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  // method to add a new user defined list under a users account
  addList: {
    validate: {
      payload: ListSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add location error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newList = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.listStore.addList(newList);
      return h.redirect("/dashboard");
    },
  },

  // method to delete a list under a users account
  deleteList: {
    handler: async function (request, h) {
      const list = await db.listStore.getListById(request.params.id);
      await db.listStore.deleteListById(list._id);
      return h.redirect("/dashboard");
    },
  },
};
