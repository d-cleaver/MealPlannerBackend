"use strict";

/** Related functions for API calls. */

const fetch = require("node-fetch");
const { BadRequestError } = require("../expressError");

const { API_KEY } = require("../config");

class API {
  static async searchRecipes(searchTerm, page) {
    if (!API_KEY) {
      throw new BadRequestError("API key not found!");
    }
    const url = new URL("https://api.spoonacular.com/recipes/complexSearch");
    const queryParams = {
      apiKey: API_KEY,
      query: searchTerm,
      number: "10",
      offset: parseInt(page * 10),
    };
    url.search = new URLSearchParams(queryParams).toString();

    const searchResponse = await fetch(url);
    const resultsJSON = await searchResponse.json();

    return resultsJSON;
  }

  static async getRecipeSummary(recipeId) {
    if (!API_KEY) {
      throw new BadRequestError("API key not found!");
    }

    const summaryURL = new URL(
      `https://api.spoonacular.com/recipes/${recipeId}/summary`
    );
    const summaryParams = {
      apiKey: API_KEY,
      recipeId: parseInt(recipeId),
    };
    summaryURL.search = new URLSearchParams(summaryParams).toString();
    const summarySearchResponse = await fetch(summaryURL);
    const summaryResultsJSON = await summarySearchResponse.json();

    return summaryResultsJSON;
  }

  static async getFavoriteRecipesByIDs(ids) {
    console.log("Received recipe IDs for fetching favorites:", ids);
    if (!API_KEY) {
      throw new BadRequestError("API key not found!");
    }
    const favoriteURL = new URL(
      "https://api.spoonacular.com/recipes/informationBulk"
    );
    const favoriteParams = {
      apiKey: API_KEY,
      ids: ids.join(","),
    };
    favoriteURL.search = new URLSearchParams(favoriteParams);
    const favoriteSearchResponse = await fetch(favoriteURL);
    const favoriteResultsJSON = await favoriteSearchResponse.json();

    // console.log("Spoonacular API response:", favoriteResultsJSON);

    return { results: favoriteResultsJSON };
  }

  static async getRecipeCard(recipeId) {
    if (!API_KEY) {
      throw new BadRequestError("API key not found!");
    }

    const cardURL = new URL(
      `https://api.spoonacular.com/recipes/${recipeId}/card`
    );
    const cardParams = {
      apiKey: API_KEY,
      mask: "heartMask",
      backgroundImage: "none",
      backgroundColor: "CFB53B",
      fontColor: "800080",
      recipeId: parseInt(recipeId),
    };
    cardURL.search = new URLSearchParams(cardParams).toString();
    const cardSearchResponse = await fetch(cardURL);
    if (!cardSearchResponse.ok) {
      console.error(
        "Error response from Spoonacular API:",
        await cardSearchResponse.text()
      );
      throw new Error("Error fetching recipe card from Spoonacular API");
    }
    const cardResultsJSON = await cardSearchResponse.json();

    return cardResultsJSON;
  }
}

module.exports = API;
