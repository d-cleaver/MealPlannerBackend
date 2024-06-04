const User = require("./user");
const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("User", () => {
  test("authenticate", async () => {
    const user = await User.authenticate("u1", "password1");
    expect(user).toEqual({
      username: "u1",
      firstName: "U1F",
      lastName: "U1L",
      email: "u1@email.com",
      isAdmin: false,
    });

    await expect(User.authenticate("u1", "wrongpassword")).rejects.toThrow(
      UnauthorizedError
    );
  });

  test("register", async () => {
    const user = await User.register({
      username: "u3",
      password: "password",
      firstName: "U3F",
      lastName: "U3L",
      email: "u3@email.com",
      isAdmin: false,
    });
    expect(user).toEqual({
      username: "u3",
      firstName: "U3F",
      lastName: "U3L",
      email: "u3@email.com",
      isAdmin: false,
    });

    await expect(
      User.register({
        username: "u1",
        password: "password",
        firstName: "U1F",
        lastName: "U1L",
        email: "u1@email.com",
        isAdmin: false,
      })
    ).rejects.toThrow(BadRequestError);
  });

  test("findAll", async () => {
    const users = await User.findAll();
    expect(users).toEqual([
      {
        username: "u1",
        firstName: "U1F",
        lastName: "U1L",
        email: "u1@email.com",
        isAdmin: false,
      },
      {
        username: "u2",
        firstName: "U2F",
        lastName: "U2L",
        email: "u2@email.com",
        isAdmin: false,
      },
    ]);
  });

  test("get", async () => {
    const user = await User.get("u1");
    expect(user).toEqual({
      username: "u1",
      firstName: "U1F",
      lastName: "U1L",
      email: "u1@email.com",
      isAdmin: false,
    });

    await expect(User.get("nonexistent")).rejects.toThrow(NotFoundError);
  });

  test("update", async () => {
    const user = await User.update("u1", { firstName: "NewF" });
    expect(user).toEqual({
      username: "u1",
      firstName: "NewF",
      lastName: "U1L",
      email: "u1@email.com",
      isAdmin: false,
    });

    await expect(
      User.update("nonexistent", { firstName: "NewF" })
    ).rejects.toThrow(NotFoundError);
  });

  test("remove", async () => {
    await User.remove("u1");
    const res = await db.query(
      `SELECT COUNT(*) FROM users WHERE username = 'u1'`
    );
    expect(res.rows[0].count).toEqual("0");

    await expect(User.remove("nonexistent")).rejects.toThrow(NotFoundError);
  });
});
