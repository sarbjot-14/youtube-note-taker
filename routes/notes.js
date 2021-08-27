var express = require("express");
var router = express.Router();
var app = require("../app.js");

router.get("/:id", async (req, res, next) => {
  let { rows } = await app.pool.query(`SELECT * FROM notes WHERE video_id = $1 ORDER BY time_stamp ASC`, [
    req.params.id,
  ]);

  rows.sort(function (a, b) {
    return a.time_stamp - b.time_stamp;
  });
  res.json(rows);
});

router.post("/insert", async (req, res, next) => {
  await app.pool.query(`INSERT INTO notes (video_id, owner, time_stamp, note) VALUES ($1, $2, $3, $4)`, [
    req.body.video_id,
    req.body.owner,
    req.body.time,
    req.body.note,
  ]);
  let { rows } = await app.pool.query(`SELECT * FROM notes WHERE video_id = $1 ORDER BY time_stamp ASC`, [
    req.body.video_id,
  ]);
  rows.sort(function (a, b) {
    return a.time_stamp - b.time_stamp;
  });
  res.json(rows);
});

router.post("/update", async (req, res, next) => {
  await app.pool.query(`UPDATE notes SET note = $1 WHERE note_id = $2`, [req.body.note, req.body.note_id]);
  res.json("test2");
});

router.delete("/delete/:id", async (req, res, next) => {
  await app.pool.query(`DELETE FROM notes WHERE note_id = $1`, [req.params.id]);
  res.json("test2");
});

module.exports = router;
