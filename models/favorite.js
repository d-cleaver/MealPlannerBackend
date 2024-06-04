"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

class Favorite {
  static async createFavorite({ username, recipeId }) {
    if (!username) {
      throw new Error("Username is required to add a favorite recipe.");
    }

    const duplicateCheck = await db.query(
      `SELECT recipeId
       FROM favorites
       WHERE username = $1 AND recipeId = $2`,
      [username, recipeId]
    );

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate favorite: ${recipeId}`);

    const result = await db.query(
      `INSERT INTO favorites (username, recipeId)
       VALUES ($1, $2)
       RETURNING id, username, recipeId`,
      [username, recipeId]
    );
    const favorite = result.rows[0];
    return favorite;
  }

  static async remove(username, recipeid) {
    const result = await db.query(
      `DELETE FROM favorites WHERE username = $1 AND recipeid = $2 RETURNING recipeid`,
      [username, recipeid]
    );
    const favorite = result.rows[0];

    if (!favorite) throw new Error(`Favorite not found: ${recipeid}`);
    return favorite;
  }

  static async getUserFavoritesSearch(username) {
    const result = await db.query(
      `SELECT id, username, recipeid
       FROM favorites
       WHERE username = $1`,
      [username]
    );
    return result.rows;
  }
  static async getUserFavorites(username) {
    const result = await db.query(
      `SELECT recipeid
       FROM favorites
       WHERE username = $1`,
      [username]
    );
    return result.rows;
  }
}

module.exports = Favorite;
