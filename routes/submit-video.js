var express = require("express");
var router = express.Router();
var app = require("../app.js");

router.post("/", function (req, res, next) {
  const { youtube_link_id, video_title, playlist_id, owner } = req.body;

  const text = "INSERT INTO videos(youtube_link_id, video_title, playlist_id, owner) VALUES($1, $2, $3, $4)";
  app.pool.query(text, [youtube_link_id, video_title, playlist_id, owner], function (err, result) {
    if (err) {
      console.log(err);
      res.end("error");
    } else {
      res.redirect("/dashboard");
    }
  });
});

module.exports = router;
