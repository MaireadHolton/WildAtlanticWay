import { assert } from "chai";
import { WAWService } from "./waw-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie, maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    WAWService.clearAuth();
    await WAWService.createUser(maggie);
    await WAWService.authenticate(maggieCredentials);
    await WAWService.deleteAllUsers();
  });

  // test to create and authenticate a new user
  test("authenticate", async () => {
    const returnedUser = await WAWService.createUser(maggie);
    const response = await WAWService.authenticate(maggieCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  // test to verify the jwt token for a new user
  test("verify Token", async () => {
    const returnedUser = await WAWService.createUser(maggie);
    const response = await WAWService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });


  // test to check that authentication is removed when a user is deleted
  test("check Unauthorized", async () => {
    WAWService.clearAuth();
    try {
      await WAWService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
