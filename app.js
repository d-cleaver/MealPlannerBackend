// app.js

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const searchRoutes = require("./routes/search-api");
const favoritesRoutes = require("./routes/favorites");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// Add the authenticateJWT middleware before defining routes
app.use(authenticateJWT);

// Define routes
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/search", searchRoutes);
app.use("/favorites", favoritesRoutes);

// Handle 404 errors
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

// Generic error handler
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
