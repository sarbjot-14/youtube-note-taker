var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  req.logout();
  res.render("logout");
});

module.exports = router;
