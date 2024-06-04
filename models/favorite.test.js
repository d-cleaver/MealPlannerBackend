const Favorite = require("./favorite");
const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
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

describe("Favorite", () => {
  test("createFavorite", async () => {
    const favorite = await Favorite.createFavorite({
      username: "u1",
      recipeId: 1,
    });
    expect(favorite).toEqual({
      id: expect.any(Number),
      username: "u1",
      recipeId: 1,
    });

    await expect(
      Favorite.createFavorite({ username: "u1", recipeId: 1 })
    ).rejects.toThrow(BadRequestError);
  });

  test("remove", async () => {
    await Favorite.createFavorite({ username: "u1", recipeId: 1 });
    const result = await Favorite.remove("u1", 1);
    expect(result).toEqual({ recipeid: 1 });

    await expect(Favorite.remove("u1", 9999)).rejects.toThrow(Error);
  });

  test("getUserFavoritesSearch", async () => {
    await Favorite.createFavorite({ username: "u1", recipeId: 1 });
    const favorites = await Favorite.getUserFavoritesSearch("u1");
    expect(favorites).toEqual([
      { id: expect.any(Number), username: "u1", recipeid: 1 },
    ]);
  });

  test("getUserFavorites", async () => {
    await Favorite.createFavorite({ username: "u1", recipeId: 1 });
    const favorites = await Favorite.getUserFavorites("u1");
    expect(favorites).toEqual([{ recipeid: 1 }]);
  });
});
