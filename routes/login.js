var express = require("express");
var router = express.Router();
const passport = require("passport");

/* GET login  page. */
router.get("/", function (req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/dashboard");
  } else {
    req.flash("normal", "Welcome, Please login");
    res.render("login", { message: req.flash("normal"), type: "normal" });
  }
});

// post route for login page, used passport authentication tutorial
router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = router;
