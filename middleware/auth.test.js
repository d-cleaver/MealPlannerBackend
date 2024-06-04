// auth.test.js

const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const {
  authenticateJWT,
  ensureLoggedIn,
  ensureAdmin,
  ensureValidUserOrAdmin,
} = require("./auth");
const { UnauthorizedError } = require("../expressError");

// Helper function to generate a JWT
function generateToken(data) {
  return jwt.sign(data, SECRET_KEY);
}

// Create an Express app to use the middleware in tests
const app = express();
app.use(express.json());

// Dummy route for testing authenticateJWT
app.get("/auth-test", authenticateJWT, (req, res) => {
  res.send({ user: res.locals.user });
});

// Dummy route for testing ensureLoggedIn
app.get("/login-test", ensureLoggedIn, (req, res) => {
  res.send({ msg: "Logged in!" });
});

// Dummy route for testing ensureAdmin
app.get("/admin-test", authenticateJWT, ensureAdmin, (req, res) => {
  res.send({ msg: "Admin access!" });
});

// Dummy route for testing ensureValidUserOrAdmin
app.get(
  "/user-test/:username",
  authenticateJWT,
  ensureValidUserOrAdmin,
  (req, res) => {
    res.send({ msg: "Valid user or admin!" });
  }
);

describe("Auth middleware", () => {
  test("authenticateJWT: valid token", async () => {
    const token = generateToken({ username: "testuser", isAdmin: false });

    const res = await request(app)
      .get("/auth-test")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.user).toEqual({ username: "testuser", isAdmin: false });
  });

  test("authenticateJWT: invalid token", async () => {
    const res = await request(app)
      .get("/auth-test")
      .set("Authorization", `Bearer invalidtoken`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.user).toBeUndefined();
  });

  test("ensureLoggedIn: logged in", async () => {
    const token = generateToken({ username: "testuser", isAdmin: false });

    const res = await request(app)
      .get("/login-test")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toEqual("Logged in!");
  });

  test("ensureLoggedIn: not logged in", async () => {
    const res = await request(app).get("/login-test");

    expect(res.statusCode).toEqual(401);
  });

  test("ensureAdmin: admin user", async () => {
    const token = generateToken({ username: "admin", isAdmin: true });

    const res = await request(app)
      .get("/admin-test")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toEqual("Admin access!");
  });

  test("ensureAdmin: non-admin user", async () => {
    const token = generateToken({ username: "testuser", isAdmin: false });

    const res = await request(app)
      .get("/admin-test")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(401);
  });

  test("ensureValidUserOrAdmin: valid user", async () => {
    const token = generateToken({ username: "testuser", isAdmin: false });

    const res = await request(app)
      .get("/user-test/testuser")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toEqual("Valid user or admin!");
  });

  test("ensureValidUserOrAdmin: admin user", async () => {
    const token = generateToken({ username: "admin", isAdmin: true });

    const res = await request(app)
      .get("/user-test/someotheruser")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toEqual("Valid user or admin!");
  });

  test("ensureValidUserOrAdmin: invalid user", async () => {
    const token = generateToken({ username: "testuser", isAdmin: false });

    const res = await request(app)
      .get("/user-test/otheruser")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(403);
  });
});
