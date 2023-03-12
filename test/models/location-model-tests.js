import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testLists, testLocations, munster, cork, glengarriff, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Location Model tests", () => {

  let munsterList = null;

  setup(async () => {
    db.init("mongo");
    await db.listStore.deleteAllLists();
    await db.locationStore.deleteAllLocations();
    munsterList = await db.listStore.addList(munster);
    for (let i = 0; i < testLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testLocations[i] = await db.locationStore.addLocation(munsterList._id, testLocations[i]);
    }
  });

  test("create single location", async () => {
    const corkList = await db.listStore.addList(cork);
    const location = await db.locationStore.addLocation(corkList._id, glengarriff)
    assert.isNotNull(location._id);
    assertSubset (glengarriff, location);
  });

  test("get multiple locations", async () => {
    const locations = await db.listStore.getListById(munsterList._id);
    assert.equal(testLocations.length, testLocations.length)
  });

  test("delete all locations", async () => {
    const locations = await db.locationStore.getAllLocations();
    assert.equal(testLocations.length, locations.length);
    await db.locationStore.deleteAllLocations();
    const newLocations = await db.locationStore.getAllLocations();
    assert.equal(0, newLocations.length);
  });

  test("get a location - success", async () => {
    const corkList = await db.listStore.addList(cork);
    const location = await db.locationStore.addLocation(corkList._id, glengarriff)
    const newLocation = await db.locationStore.getLocationById(location._id);
    assertSubset (glengarriff, newLocation);
  });

  test("delete One Location - success", async () => {
    await db.locationStore.deleteLocation(testLocations[0]._id);
    const locations = await db.locationStore.getAllLocations();
    assert.equal(locations.length, testLists.length - 1);
    const deletedLocation = await db.locationStore.getLocationById(testLocations[0]._id);
    assert.isNull(deletedLocation);
  });

  test("get a location - bad params", async () => {
    assert.isNull(await db.locationStore.getLocationById(""));
    assert.isNull(await db.locationStore.getLocationById());
  });

  test("delete one location - fail", async () => {
    await db.locationStore.deleteLocation("bad-id");
    const locations = await db.locationStore.getAllLocations();
    assert.equal(locations.length, testLists.length);
  });
});
