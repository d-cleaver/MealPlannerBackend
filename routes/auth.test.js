const request = require("supertest");
const app = require("../app");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("Auth routes", () => {
  test("POST /auth/token - login", async () => {
    const response = await request(app)
      .post("/auth/token")
      .send({ username: "u1", password: "password1" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ token: expect.any(String) });
  });

  test("POST /auth/register - register", async () => {
    const response = await request(app).post("/auth/register").send({
      username: "newuser",
      password: "password",
      firstName: "New",
      lastName: "User",
      email: "new@user.com",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ token: expect.any(String) });
  });
});
