import { assert } from "chai";
import { WAWService } from "./waw-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    WAWService.clearAuth();
    await WAWService.createUser(maggie);
    await WAWService.authenticate(maggieCredentials);
    await WAWService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await WAWService.createUser(testUsers[i]);
    }
    await WAWService.createUser(maggie);
    await WAWService.authenticate(maggieCredentials);
  });
  teardown(async () => {});

  // test a user is created
test("create a user", async () => {
  const newUser = await WAWService.createUser(maggie);
  assertSubset(maggie, newUser);
  assert.isDefined(newUser._id);
  });


  // test all users deleted
test("delete all users", async () => {
  let returnedUsers = await WAWService.getAllUsers();
  assert.equal(returnedUsers.length, 4);
  await WAWService.deleteAllUsers();
  await WAWService.createUser(maggie);
  await WAWService.authenticate(maggieCredentials);
  returnedUsers = await WAWService.getAllUsers();
  assert.equal(returnedUsers.length, 1);
});


// test to find a user
test("get a user", async () => {
  const returnedUser = await WAWService.getUser(users[0]._id);
  assert.deepEqual(users[0], returnedUser);
  });

// test to see that the system gives an error if searching for a non-existant user
  test("get a user - bad id", async () => {
    try {
      const returnedUser = await WAWService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  // test to see that the system gives an error if searching for a deleted user
  test("get a user - deleted user", async () => {
    await WAWService.deleteAllUsers();
    await WAWService.createUser(maggie);
    await WAWService.authenticate(maggieCredentials);
    try {
      const returnedUser = await WAWService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});
