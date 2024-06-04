const fetch = require("node-fetch");
const API = require("./search_api");
const { BadRequestError } = require("../expressError");

jest.mock("node-fetch");

describe("API", () => {
  const API_KEY = "testapikey";

  beforeEach(() => {
    process.env.API_KEY = API_KEY;
  });

  afterEach(() => {
    delete process.env.API_KEY;
  });

  test("searchRecipes", async () => {
    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ results: ["recipe1", "recipe2"] }),
    });

    const results = await API.searchRecipes("test", 0);
    expect(results).toEqual({ results: ["recipe1", "recipe2"] });

    await expect(API.searchRecipes("test", 0)).rejects.toThrow(BadRequestError);
  });

  test("getRecipeSummary", async () => {
    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ summary: "summary text" }),
    });

    const summary = await API.getRecipeSummary(1);
    expect(summary).toEqual({ summary: "summary text" });

    await expect(API.getRecipeSummary(1)).rejects.toThrow(BadRequestError);
  });

  test("getFavoriteRecipesByIDs", async () => {
    fetch.mockResolvedValue({
      json: jest
        .fn()
        .mockResolvedValue({ results: ["favorite1", "favorite2"] }),
    });

    const results = await API.getFavoriteRecipesByIDs([1, 2]);
    expect(results).toEqual({ results: ["favorite1", "favorite2"] });

    await expect(API.getFavoriteRecipesByIDs([1, 2])).rejects.toThrow(
      BadRequestError
    );
  });

  test("getRecipeCard", async () => {
    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ card: "card content" }),
    });

    const card = await API.getRecipeCard(1);
    expect(card).toEqual({ card: "card content" });

    await expect(API.getRecipeCard(1)).rejects.toThrow(BadRequestError);
  });
});
