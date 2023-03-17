import { db } from "../models/db.js";
import { LocationSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const listController = {
  index: {
    handler: async function (request, h) {
      const list = await db.listStore.getListById(request.params.id);
      const viewData = {
        title: "List",
        list: list,
      };
      return h.view("list-view", viewData);
    },
  },

  addLocation: {
    validate: {
      payload: LocationSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("list-view", { title: "Add location error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const list = await db.listStore.getListById(request.params.id);
      const newLocation = {
        location: request.payload.location,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
        date: request.payload.date,
        details: request.payload.details,
      };
      await db.locationStore.addLocation(list._id, newLocation);
      return h.redirect(`/list/${list._id}`);
    },
  },

  deleteLocation: {
    handler: async function(request, h) {
      const list = await db.listStore.getListById(request.params.id);
      await db.locationStore.deleteLocation(request.params.locationid);
      return h.redirect(`/list/${list._id}`);
    },
  },

  uploadImage: {
    handler: async function (request, h) {
      try {
        const list = await db.listStore.getListById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          list.img = url;
          await db.listStore.updateList(list);
        }
        return h.redirect(`/list/${list._id}`);
      } catch (err) {
        const list = await db.listStore.getListById(request.params.id);
        console.log(err);
        return h.redirect(`/list/${list._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
};
