import { EventEmitter } from "events";
import { assert } from "chai";
import { WAWService } from "./waw-service.js";
import { assertSubset } from "../test-utils.js";
import { cork, maggie, maggieCredentials, testLists } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("List API tests", () => {

  let user = null;

  setup(async () => {
    WAWService.clearAuth();
    user = await WAWService.createUser(maggie);
    await WAWService.authenticate(maggieCredentials);
    await WAWService.deleteAllLists();
    await WAWService.deleteAllUsers();
    user = await WAWService.createUser(maggie);
    await WAWService.authenticate(maggieCredentials);
    cork.userid = user._id;
  });

  teardown(async () => {});

  // test to check if a list is created
  test("create list", async () => {
    const returnedList = await WAWService.createList(cork);
    assert.isNotNull(returnedList);
    assertSubset(cork, returnedList);
  });

  // test to check a list is deleted 
  test("Delete a list", async () => {
    for (let i = 0; i < testLists.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await WAWService.createList(cork);
    }
    let returnedLists = await WAWService.getAllLists();
    assert.equal(returnedLists.length, testLists.length);
    for (let i = 0; i < returnedLists.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const list = await WAWService.deleteList(returnedLists[i]._id);
    }
    returnedLists = await WAWService.getAllLists();
    assert.equal(returnedLists.length, 0);
  });

  // test to check mulitple lists can be created
  test("create multiple lists", async () => {
    for (let i = 0; i < testLists.length; i += 1) {
        testLists[i].userid = user._id;
        // eslint-disable-next-line no-await-in-loop
        await WAWService.createList(testLists[i]);
      }
      let returnedLists = await WAWService.getAllLists();
      assert.equal(returnedLists.length, testLists.length);
      await WAWService.deleteAllLists();
      returnedLists = await WAWService.getAllLists();
      assert.equal(returnedLists.length, 0);
    });
  

    // test to check what happens if a non-existant list is deleted
    test("remove non-existant list", async () => {
      try {
        const response = await WAWService.deleteList("not an id");
        assert.fail("Should not return a response");
      } catch (error) {
        assert(error.response.data.message === "No List with this id", "Incorrect Response Message");
      }
    })
})