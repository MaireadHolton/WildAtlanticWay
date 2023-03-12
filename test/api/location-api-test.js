import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { WAWService } from "./waw-service.js";
import { maggie, cork, testLists, testLocations, glengarriff, maggieCredentials } from "../fixtures.js";

suite("Location API tests", () => {
  let user = null;
  let munster = null;

  setup(async () => {
    WAWService.clearAuth();
    user = await WAWService.createUser(maggie);
    await WAWService.authenticate(maggieCredentials);
    await WAWService.deleteAllLists();
    await WAWService.deleteAllLocations();
    await WAWService.deleteAllUsers();
    user = await WAWService.createUser(maggie);
    await WAWService.authenticate(maggieCredentials);
    cork.userid = user._id;
    munster = await WAWService.createList(cork);
  });

  teardown(async () => {});

  test("create location", async () => {
      const returnedLocation = await WAWService.createLocation(munster._id, glengarriff);
      assertSubset(glengarriff, returnedLocation);
  });

  test("create Multiple locations", async () => {
    for (let i = 0; i < testLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await WAWService.createLocation(munster._id, testLocations[i]);
    }
    const returnedLocations = await WAWService.getAllLocations();
    assert.equal(returnedLocations.length, testLocations.length);
    for (let i = 0; i < returnedLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const location = await WAWService.getLocation(returnedLocations[i]._id);
      assertSubset(location, returnedLocations[i]);
    }
  });

  test("Delete Location", async () => {
    for (let i = 0; i < testLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await WAWService.createLocation(munster._id, testLocations[i]);
    }
    let returnedLocations = await WAWService.getAllLocations();
    assert.equal(returnedLocations.length, testLocations.length);
    for (let i = 0; i < returnedLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const location = await WAWService.deleteLocation(returnedLocations[i]._id);
    }
    returnedLocations = await WAWService.getAllLocations();
    assert.equal(returnedLocations.length, 0);
  });

  test("test denormalised list", async () => {
    for (let i = 0; i < testLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await WAWService.createLocation(munster._id, testLocations[i]);
    }
    const returnedList = await WAWService.getList(munster._id);
    assert.equal(returnedList.locations.length, testLocations.length);
    for (let i = 0; i < testLocations.length; i += 1) {
      assertSubset(testLocations[i], returnedList.locations[i]);
    }
  });
}); 