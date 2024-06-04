const request = require("supertest");
const app = require("../app");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  adminToken,
  u1Token,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("Users routes", () => {
  test("POST / - add new user", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        username: "newuser",
        password: "password",
        firstName: "New",
        lastName: "User",
        email: "new@user.com",
        isAdmin: false,
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      user: {
        username: "newuser",
        firstName: "New",
        lastName: "User",
        email: "new@user.com",
        isAdmin: false,
      },
      token: expect.any(String),
    });
  });

  test("GET / - get all users", async () => {
    const response = await request(app)
      .get("/users")
      .set("authorization", `Bearer ${adminToken}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      users: expect.any(Array),
    });
  });

  test("GET /:username - get specific user", async () => {
    const response = await request(app)
      .get("/users/u1")
      .set("authorization", `Bearer ${u1Token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      user: {
        username: "u1",
        firstName: "U1F",
        lastName: "U1L",
        email: "user1@user.com",
        isAdmin: false,
      },
    });
  });

  test("PATCH /:username - update specific user", async () => {
    const response = await request(app)
      .patch("/users/u1")
      .send({ firstName: "Updated" })
      .set("authorization", `Bearer ${u1Token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      user: {
        username: "u1",
        firstName: "Updated",
        lastName: "U1L",
        email: "user1@user.com",
        isAdmin: false,
      },
    });
  });

  test("DELETE /:username - delete specific user", async () => {
    const response = await request(app)
      .delete("/users/u1")
      .set("authorization", `Bearer ${adminToken}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ deleted: "u1" });
  });
});
