const express = require("express");
const loginSchema = require("./validation/login");
const router = express.Router();

/* GET login listing. */
router.get("/", function (req, res) {
  res.render("login");
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const value = await loginSchema.schema.validateAsync(req.body, {
      abortEarly: false,
    });
    console.log("value", value);
    res.redirect("/admin");
  } catch (err) {
    // console.error("err", err);
    res.json(err);
  }
});

router.get("/unsecured", (req, res) => {
  console.log(req.query);
});

module.exports = router;
