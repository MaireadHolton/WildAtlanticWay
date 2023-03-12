import { assert } from "chai";
import { WAWService } from "./waw-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    WAWService.clearAuth();
    await WAWService.createUser(maggie);
    await WAWService.authenticate(maggie);
    await WAWService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await WAWService.createUser(maggie);
    const response = await WAWService.authenticate(maggie);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await WAWService.createUser(maggie);
    const response = await WAWService.authenticate(maggie);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

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
