import { userApi } from "./api/user-api.js";
import { listApi } from "./api/list-api.js";
import { locationApi } from "./api/location-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/lists", config: listApi.create },
  { method: "DELETE", path: "/api/lists", config: listApi.deleteAll },
  { method: "GET", path: "/api/lists", config: listApi.find },
  { method: "GET", path: "/api/lists/{id}", config: listApi.findOne },
  { method: "DELETE", path: "/api/lists/{id}", config: listApi.deleteOne },

  { method: "GET", path: "/api/locations", config: locationApi.find },
  { method: "GET", path: "/api/locations/{id}", config: locationApi.findOne },
  { method: "POST", path: "/api/lists/{id}/locations", config: locationApi.create },
  { method: "DELETE", path: "/api/locations", config: locationApi.deleteAll },
  { method: "DELETE", path: "/api/locations/{id}", config: locationApi.deleteOne },
];
