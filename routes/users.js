var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res) {
  res.render("users", { username: "kenny", isLoggedIn: true });
});

router.get("/:year/:month/:day", (req, res) => {
  console.log(req.params);
});

module.exports = router;
