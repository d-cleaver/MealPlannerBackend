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
}

module.exports = API;
