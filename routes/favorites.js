const express = require("express");
const {
  ensureValidUserOrAdmin,
  authenticateJWT,
} = require("../middleware/auth");
const Favorite = require("../models/favorite");
const API = require("../models/search_api.js");

const router = new express.Router();

// Get all favorite recipes for a user
router.get(
  "/:username/favorite",
  authenticateJWT,
  ensureValidUserOrAdmin,
  async function (req, res, next) {
    try {
      const favorites = await Favorite.getUserFavoritesSearch(
        req.params.username
      );
      return res.json({ favorites });
    } catch (err) {
      return next(err);
    }
  }
);

/** GET /favorites/:recipeId/card =>
 * Redirects to the recipe card URL with fixed parameters
 **/
router.get("/:recipeId/card", async function (req, res, next) {
  try {
    const { recipeId } = req.params;
    const cardResults = await API.getRecipeCard(recipeId);
    const { url } = cardResults;

    console.log("Redirecting to URL:", url);

    // Set CORS headers before redirecting
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    return res.redirect(url);
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

/** GET /favorites/:username =>
 * Returns all favorites for a specific user
 **/
router.get("/:username", authenticateJWT, async function (req, res, next) {
  try {
    const { username } = req.params;
    console.log("Received request for favorites of user:", username);

    const recipes = await Favorite.getUserFavorites(username);
    console.log("User favorite recipe IDs from DB:", recipes);

    const recipeIds = recipes.map((recipe) => recipe.recipeid.toString());
    console.log("recipeids as string:", recipeIds);

    // check if user has any favorites
    if (recipeIds.length === 0) {
      return res.json({ message: `${username} has no favorite recipes` });
    }

    // Fetch recipe details for the favorite recipe IDs using getFavoriteRecipesByIDs
    const favorites = await API.getFavoriteRecipesByIDs(recipeIds);
    // console.log(`Retrieved favorites for user ${username}:`, favorites);

    return res.json(favorites);
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

module.exports = router;
