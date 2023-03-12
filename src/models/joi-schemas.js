import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
.keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
})
.label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const LocationSpec = Joi.object()
  .keys( {
    location: Joi.string().required().example("Glengarriff"),
    latitude: Joi.number().required().example(51.75),
    longitude: Joi.number().required().example(9.55),
    date: Joi.string().optional().example("August 2022"),
    details: Joi.string().optional().example("Overcast, went to Garnish Island"),
    pictures: Joi.any().optional(),
    listid: IdSpec,
})
.label("Location");

export const LocationSpecPlus = LocationSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("LocationPlus");

export const LocationArraySpec = Joi.array().items(LocationSpecPlus).label("LocationArray");

export const ListSpec =  Joi.object()
  .keys({
    title: Joi.string().required().example("Cork"),
    userid: IdSpec,
    locations: LocationArraySpec,
  })
  .label("List");

export const ListSpecPlus = ListSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
  }).label("ListPlus");
  
export const ListArraySpec = Joi.array().items(ListSpecPlus).label("ListArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");
