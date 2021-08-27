var express = require("express");
var router = express.Router();
var app = require("../app.js");

router.get("/", function (req, res, next) {
  app.pool.query(`DELETE  FROM playlists WHERE playlist_id =${req.query.playlist_id}`, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/dashboard");
    }
  });
});

module.exports = router;
