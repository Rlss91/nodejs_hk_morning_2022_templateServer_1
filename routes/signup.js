const express = require("express");
const loginSchema = require("./validation/login");
const router = express.Router();
const bcrypt = require("../config/bcrypt");

let usersArr = [
  { email: "1@2.com", name: "1", password: "Aa123456" },
  { email: "2@2.com", name: "2", password: "Aa123456" },
];

/* GET singup listing. */
router.get("/", function (req, res) {
  res.render("signup");
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const value = await loginSchema.schema.validateAsync(req.body, {
      abortEarly: false,
    });
    value.password = await bcrypt.createHash(value.password);
    usersArr = [...usersArr, value];
    console.log(usersArr);
    res.redirect("/login");
  } catch (err) {
    res.redirect("/login");
  }
});

module.exports = router;
