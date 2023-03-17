import { LocationSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const locationController = {
  index: {
    handler: async function (request, h) {
      const list = await db.listStore.getListById(request.params.id);
      const location = await db.locationStore.getLocationById(request.params.locationid);
      const viewData = {
        title: "Edit location",
        list: list,
        location: location,
      };
      return h.view("location-view", viewData);
    },
  },

  update: {
    validate: {
      payload: LocationSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("location-view", { title: "Edit location error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.locationid);
      const newLocation = {
        location: request.payload.location,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        date: request.payload.date,
        details: request.payload.details,
      };
      await db.locationStore.updateLocation(location, newLocation);
      return h.redirect(`/list/${request.params.id}`);
    },
  },
};
