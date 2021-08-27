var express = require("express");
var router = express.Router();

var app = require("../app.js");

router.get("/:id", async (req, res, next) => {
  var video_id = req.params.id;
  let { rows } = await app.pool.query(`SELECT * FROM videos WHERE video_id = $1`, [video_id]);
  let youtubeId = rows[0].youtube_link_id;
  let owner = rows[0].owner;
  let { rows: notes } = await app.pool.query(`SELECT * FROM notes WHERE video_id = $1`, [video_id]);
  res.render("../views/player_view", { youtubeId, notes, video_id, owner });
});

module.exports = router;
