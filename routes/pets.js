var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res) {
  res.render("pets", {
    pets: ["dog", "cat", "dolphine", "shark", "oger", "jiraf"],
  });
});

module.exports = router;
