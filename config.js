"use strict";

/** Shared config for application; can be required many places. */

require("dotenv").config();
require("colors");

const API_KEY = "b9c1965fef7d41a1995e02f89001945a";
// "097a2ba5f3614d5daccac162f45ba224"
// "cc4e1c7194e3412a8f00b837360f49d6"
// "b9c1965fef7d41a1995e02f89001945a"
const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const PORT = +process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? "postgresql://postgres:dylan1995@localhost/mealPlan_test"
    : process.env.DATABASE_URL ||
        "postgresql://postgres:dylan1995@localhost/mealPlan";
  // postgres://sxtrqnxh:6BCnkIuVD183k7lABsuD2AlAKQ1zkopA@kala.db.elephantsql.com/sxtrqnxh
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("Jobly Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
  API_KEY,
};
