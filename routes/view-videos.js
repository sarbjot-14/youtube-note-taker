var express = require("express");
var router = express.Router();

var app = require("../app.js");

router.get("/", function (req, res, next) {
  app.pool.query(`SELECT * FROM videos WHERE playlist_id = ${req.query.id}`, function (err, result) {
    if (err) {
      console.log(err);
    }

    var results = { result: result.rows[0] ? result.rows : [] };

    res.render("view-videos", {
      title: req.query.playlist_name,
      videos: results.result,
      playlist_id: req.query.id,
      owner: req.query.owner,
    });
  });
});

module.exports = router;
