var express = require("express");
var router = express.Router();
var app = require("../app.js");

function pad(n) {
  return n < 10 ? "0" + n : n;
}

function timeformat(t) {
  var h = Math.floor(t / 3600);
  var m = Math.floor((t % 3600) / 60);
  var s = Math.floor((t % 3600) % 60);
  return pad(h) + ":" + pad(m) + ":" + pad(s);
}

router.get("/", function (req, res, next) {
  //if (req.query )
  app.pool.query(
    `SELECT * FROM notes WHERE video_id = ${req.query.video_id} AND owner = ${req.query.owner}`,
    function (err, result) {
      if (err) {
        console.log(err);
      }

      for (var i = 0; i < result.rows.length; i++) {
        result.rows[i].time_stamp = timeformat(Math.round(result.rows[i].time_stamp));
      }
      res.render(`user-notes-list`, { userNotesList: result.rows });
    }
  );
});

router.post("/", function (req, res, next) {
  const text = `UPDATE notes SET note = $1, time_stamp = $2 where owner = $3 AND video_id = $4 AND note_id = $5`;
  if (Array.isArray(req.body.note_id) == false) {
    //app.pool.query(`DELETE FROM notes WHERE ${req.body.deleted[i]} = ${i} AND video_id = `)
    app.pool.query(
      `DELETE FROM notes WHERE note_id = ${req.body.deleted} AND owner = ${req.body.owner} AND video_id = ${req.body.video_id}`,
      function (err, result) {
        if (err) {
          console.log(err);
        }
      }
    );

    app.pool.query(
      text,
      [req.body.notes_list, req.body.time_stamp, req.body.owner, req.body.video_id, req.body.note_id],
      (err, result) => {
        if (err) {
          console.log(err);
        }
        //console.log("update values single", result);
        //console.log("req body", req.body);
      }
    );
  } else {
    for (var i = 0; i < req.body.note_id.length; i++) {
      //console.log('req user_notes post', req.body.note_id[i]);
      //console.log('req user_notes timeStamp', req.body.time_stamp[i]);
      app.pool.query(
        `DELETE FROM notes WHERE note_id = ${req.body.deleted[i]} AND owner = ${req.body.owner} AND video_id = ${req.body.video_id}`,
        function (err, result) {
          if (err) {
            console.log(err);
          }
        }
      );
      app.pool.query(
        text,
        [req.body.notes_list[i], req.body.time_stamp[i], req.body.owner, req.body.video_id, req.body.note_id[i]],
        (err, result) => {
          if (err) {
            console.log(err);
          }
          //console.log("update values", result);
        }
      );
    }
  }
  setTimeout(() => {
    app.pool.query(
      `SELECT * FROM notes WHERE video_id = ${req.body.video_id} AND owner = ${req.body.owner}`,
      function (err, result) {
        if (err) {
          console.log(err);
        }
        for (var i = 0; i < result.rows.length; i++) {
          result.rows[i].time_stamp = timeformat(Math.round(result.rows[i].time_stamp));
        }
        res.render(`user-notes-list`, { userNotesList: result.rows });
      }
    );
  }, 500);
});
module.exports = router;
