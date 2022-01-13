const express = require("express");
const bcrypt = require("../config/bcrypt");
const loginSchema = require("./validation/login");
const router = express.Router();

const usersArr = [
  {
    email: "1@2.com",
    name: "1",
    password: "$2a$10$PqOHM0dgNN4W78KWxStHoOC7UwYkQxiB2jxMJqz1aJGSZ7DYU1TL6",
  },
  {
    email: "2@2.com",
    name: "2",
    password: "$2a$10$PqOHM0dgNN4W78KWxStHoOC7UwYkQxiB2jxMJqz1aJGSZ7DYU1TL6",
  },
];

/* GET login listing. */
router.get("/", function (req, res) {
  // console.log(req.session.errjoi.details[0]);
  let errjoi = {};
  if (req.session.errjoi) {
    errjoi = req.session.errjoi;
    req.session.errjoi = undefined;
  }
  console.log(errjoi);
  res.render("login", errjoi);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const value = await loginSchema.schema.validateAsync(req.body, {
      abortEarly: false,
    });
    console.log("value", value);
    for (let user of usersArr) {
      if (user.email === value.email) {
        let isOk = await bcrypt.cmpHash(value.password, user.password);
        if (isOk) {
          req.session.loggedIn = true;
          req.session.loggedInUsername = user.name;
          // res.redirect("/admin");
          res.redirect("/users");
          return;
        }
      }
    }
    req.session.errjoi = {
      details: [{ message: "user or password incorrect" }],
    };
    req.session.loggedIn = false;
    res.redirect("/login");
  } catch (err) {
    req.session.loggedIn = false;
    req.session.errjoi = err;
    res.redirect("/login");
    // console.error("err", err);
    // res.json(err);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

router.get("/unsecured", (req, res) => {
  console.log(req.query);
});

module.exports = router;
