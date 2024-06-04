const request = require("supertest");
const app = require("../app");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("Search API routes", () => {
  test("GET /search - search for recipes", async () => {
    const response = await request(app)
      .get("/search")
      .query({ searchTerm: "chicken", page: 0 });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
  });

  test("GET /search/:recipeId - get recipe summary", async () => {
    const response = await request(app).get("/search/1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
  });

  test("POST /search/favorites - add favorite recipe", async () => {
    const response = await request(app)
      .post("/search/favorites")
      .send({ recipeId: 1 })
      .set("authorization", `Bearer ${u1Token}`);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(expect.any(Object));
  });

  test("DELETE /search/favorites/:id - delete favorite recipe", async () => {
    const response = await request(app)
      .delete("/search/favorites/1")
      .set("authorization", `Bearer ${u1Token}`);
    expect(response.statusCode).toBe(204);
  });
});
