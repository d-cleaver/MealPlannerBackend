const request = require("supertest");
const app = require("../app");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  adminToken,
} = require("./_testCommon");
const db = require("../db");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("Favorites routes", () => {
  test("GET /:username/favorite - get user's favorite recipes", async () => {
    const response = await request(app)
      .get("/favorites/u1/favorite")
      .set("authorization", `Bearer ${u1Token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ favorites: [] });
  });

  test("GET /:recipeId/card - get recipe card", async () => {
    const response = await request(app).get("/favorites/1/card");
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBeDefined();
  });

  test("GET /:username - get favorite recipes for user", async () => {
    const response = await request(app)
      .get("/favorites/u1")
      .set("authorization", `Bearer ${u1Token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "u1 has no favorite recipes" });
  });
});
