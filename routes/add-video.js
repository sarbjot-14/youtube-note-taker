var express = require("express");
var router = express.Router();
var app = require("../app.js");

/* GET add video page. */

router.get("/", function (req, res, next) {
  res.render("add-video", { playlist_id: req.query.playlist_id, owner: req.query.owner });
});

module.exports = router;
