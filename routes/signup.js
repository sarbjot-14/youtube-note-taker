var express = require("express");
var router = express.Router();
bcrypt = require("bcrypt");
passport = require("passport");
const app = require("../app");

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  }
  next();
}
/* GET home page. */
router.get("/", checkAuthenticated, function (req, res, next) {
  req.flash("normal", "Signup with a new email");
  res.render("signup.ejs", { message: req.flash("normal"), type: "normal" });
});

module.exports = router;

// checking values from the register form:
router.post("/", async (req, result) => {
  // using name for users
  const username = req.body.username;
  const useremail = req.body.useremail;
  const password = req.body.idPassword;
  const confirmPassword = req.body.idconfirmPassword;

  // check if same password in both sections
  if (password != confirmPassword) {
    req.flash("error", "Confirm Password and Password does not match. Please try again");
    result.render("signup", { message: req.flash("error"), type: "error" });
  } else {
    // This thread is waiting for password added by user therefore used async and await for result
    let hashedPassword = await bcrypt.hash(password, 10);

    // to make sure that the their are unique emails
    // users are only allowed to login with one email
    var sql = `SELECT * from users WHERE email = $1;`;
    app.pool.query(sql, [useremail], (err, res) => {
      if (err) {
        console.log(err.message);
      } else {
        // send an error message if the registered email is already present
        if (res.rows.length > 0) {
          req.flash("error", "Email already registered. Please register with a new email");
          result.render("signup", { message: req.flash("error"), type: "error" });
        } else {
          // if email is not registerd yet insert the users data in table
          var sql2 = `INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING id, password;`;
          app.pool.query(sql2, [username, useremail, hashedPassword], (err, res) => {
            if (err) {
              console.log(err.message);
            } else {
              // giving accurate feedback and going to login
              req.flash("success", "Registered successfully. Please log in ");
              result.render("login", { successMsg: req.flash("success"), type: "success" });
            }
          });
        }
      }
    });
  }
});
