import Boom from "@hapi/boom";
import { IdSpec, ListArraySpec, ListSpec, ListSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const listApi = {
  // function for finding all of the user defined lists on a users dashboard
  find: {
    auth: {strategy: "jwt",},
    handler: async function (request, h) {
        try {
            const lists = await db.listStore.getAllLists();
            return lists;
          } catch (err) {
            return Boom.serverUnavailable("Database Error");
          }
    },
    tags: ["api"],
    response: { schema: ListArraySpec, failAction: validationError },
    description: "Get all lists",
    notes: "Returns all lists",
  },

  findOne: {
    // function for finding a single user defined list on a users dashboard
    auth: {strategy: "jwt",},
    async handler(request) {
        try {
            const list = await db.listStore.getListById(request.params.id);
            if (!list) {
              return Boom.notFound("No List with this id");
            }
            return list;
          } catch (err) {
            return Boom.serverUnavailable("No List with this id");
          }
    },
    tags: ["api"],
    description: "Find a List",
    notes: "Returns a list",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: ListSpecPlus, failAction: validationError },
  },

  create: {
    // function for creating a user defined list on a users account
    auth: {strategy: "jwt",},
    handler: async function (request, h) {
        try {
            const list = request.payload;
            const newList = await db.listStore.addList(list);
            if (newList) {
              return h.response(newList).code(201);
            }
            return Boom.badImplementation("error creating list");
          } catch (err) {
            return Boom.serverUnavailable("Database Error");
          } 
    },
    tags: ["api"],
    description: "Create a List",
    notes: "Returns the newly created list",
    validate: { payload: ListSpec, failAction: validationError },
    response: { schema: ListSpecPlus, failAction: validationError },
  },

  deleteOne: {
    // function for deleting a single user defined list on a users account
    auth: {strategy: "jwt",},
    handler: async function (request, h) {
        try {
            const list = await db.listStore.getListById(request.params.id);
            if (!list) {
              return Boom.notFound("No List with this id");
            }
            await db.listStore.deleteListById(list._id);
            return h.response().code(204);
          } catch (err) {
            return Boom.serverUnavailable("No List with this id");
          }
    },
    tags: ["api"],
    description: "Delete a list",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    // function for deleting all user defined lists on a users account
    auth: {strategy: "jwt",},
    handler: async function (request, h) {
        try {
            await db.listStore.deleteAllLists();
            return h.response().code(204);
          } catch (err) {
            return Boom.serverUnavailable("Database Error");
          }  
    },
  },
  tags: ["api"],
    description: "Delete all ListApi",
};
