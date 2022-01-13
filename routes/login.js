const express = require("express");
const loginSchema = require("./validation/login");
const router = express.Router();

const usersArr = [
  { email: "1@2.com", password: "Aa123456" },
  { email: "2@2.com", password: "Aa123456" },
];

/* GET login listing. */
router.get("/", function (req, res) {
  // console.log(req.session.errjoi.details[0]);
  let errjoi = {};
  if (req.session.errjoi) errjoi = req.session.errjoi;
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
        if (user.password === value.password) {
          req.session.loggedIn = true;
          res.redirect("/admin");
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

router.get("/unsecured", (req, res) => {
  console.log(req.query);
});

module.exports = router;
