"use strict";

/** Routes for spoonacular api. */

const express = require("express");
const API = require("../models/search_api.js");
const Favorite = require("../models/favorite.js");
const { authenticateJWT } = require("../middleware/auth");

const router = express.Router();

/** GET /search =>
 * Returns results object with recipe id, title, img, imgageType
 **/

router.get("/", async function (req, res, next) {
  try {
    const searchTerm = req.query.searchTerm;
    const page = parseInt(req.query.page);

    const search = await API.searchRecipes(searchTerm, page);
    return res.json(search);
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

/** GET /search/:recipeId =>
 * Returns summaryResults object with id, title, and summary
 **/

router.get("/:recipeId", async function (req, res, next) {
  try {
    const recipeId = req.params.recipeId;
    const summaryResults = await API.getRecipeSummary(recipeId);
    return res.json(summaryResults);
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

/** POST /search/favorites =>
 * Creates a new favorite
 **/
router.post("/favorites", authenticateJWT, async function (req, res, next) {
  try {
    // Extract the username from res.locals.user
    const username = res.locals.user.username;
    console.log("User attempting to add favorite:", username);
    const { recipeId } = req.body;

    const favoriteRecipe = await Favorite.createFavorite({
      username,
      recipeId,
    });
    return res.status(201).json(favoriteRecipe);
  } catch (err) {
    console.error("Error in /favorites route:", err);
    return next(err);
  }
});

/** DELETE /search/favorites/:recipeId =>
 * Deletes a favorite by recipeId
 **/
router.delete("/favorites/:id", async function (req, res, next) {
  try {
    const { id: recipeId } = req.params;
    const username = res.locals.user.username;
    await Favorite.remove(username, recipeId);
    return res.status(204).json({});
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
