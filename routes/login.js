var express = require("express");
var router = express.Router();

/* GET login listing. */
router.get("/", function (req, res) {
  res.render("login");
});

router.post("/", (req, res) => {
  console.log(req.body);
});

router.get("/unsecured", (req, res) => {
  console.log(req.query);
});

module.exports = router;
