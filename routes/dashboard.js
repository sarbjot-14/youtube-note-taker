var express = require("express");
var router = express.Router();

var app = require("../app.js");
passport = require("passport");

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("login");
  }
}
router.get("/", checkNotAuthenticated, function (req, res, next) {
  app.pool.query(`SELECT * FROM playlists  WHERE owner =${req.user.id}`, function (err, result) {
    if (err) {
      console.log(err);
    }
    var results = { result: result.rows[0] ? result.rows : [] };

    res.render("dashboard", { title: "Dashboard", playlists: results.result, user: req.user.name, id: req.user.id });
  });
});

module.exports = router;
