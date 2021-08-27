var express = require("express");
var router = express.Router();
var app = require("../app.js");

router.post("/", function (req, res, next) {
  const { playlist_id, playlist_name } = req.body;

  const text = "UPDATE playlists SET playlist_name = $1  WHERE playlist_id =$2";
  app.pool.query(text, [playlist_name, playlist_id], function (err, result) {
    if (err) {
      console.log(err);
      res.end("error");
    } else {
      res.redirect("/dashboard");
    }
  });
});

module.exports = router;
