var express = require("express");
var router = express.Router();
var app = require("../app.js");
//https://www.quirksmode.org/js/forms.html

router.post("/", function (req, res, next) {
  //const text = `UPDATE notes SET notes = $1, timestamp = $2 where owner = $3 AND video_id = $4`;
  console.log("req user edit post", req.body.note_id[0]);
  //res.render('user-notes-list-edit');
  app.pool.query(
    `SELECT * FROM notes WHERE owner = ${req.body.owner} AND video_id = ${req.body.video_id}`,
    function (err, result) {
      if (err) {
        console.log(err);
      }
      res.render(`user-notes-list-edit`, { userNotesList: result.rows });
    }
  );
});
module.exports = router;
