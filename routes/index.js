var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { page: "Home", menuId: "home" });
});
/* GET add video page. */
router.get("/add-videos", function (req, res, next) {
  res.render("add-videos", { page: "Add Videos", menuId: "add-videos" });
});

module.exports = router;
