"use strict";

/** Routes for spoonacular api. */

const jsonschema = require("jsonschema");

const express = require("express");
// const {ensureValidUserOrAdmin} = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const API = require("../models/search_api.js");
const apiSchema = require("../schemas/apiSchema.json");

const router = express.Router();

/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName, isAdmin }
 *
 * Authorization required: admin ||  (user === :username)
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

module.exports = router;
