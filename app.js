var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
connectFlash = require("connect-flash");

var indexRouter = require("./routes/index");
var loginRouter = require("./routes/login");
var logOutRouter = require("./routes/logout");
var signUpRouter = require("./routes/signup");
var usersRouter = require("./routes/users");
var dashboardRouter = require("./routes/dashboard");
var addPlaylistRouter = require("./routes/add-playlist");
var viewVideosRouter = require("./routes/view-videos");
var editPlaylistRouter = require("./routes/edit-playlist");
var renamePlaylistRouter = require("./routes/rename-playlist");
var deletePlaylistRouter = require("./routes/delete-playlist");
var videoPlayerRouter = require("./routes/player_view");
var notesRouter = require("./routes/notes");
var addVideoRouter = require("./routes/add-video");
var submitVideoRouter = require("./routes/submit-video");
var deleteVideoRouter = require("./routes/delete-video");
var notesListRouter = require("./routes/user-notes-list");
var notesListRouterEdited = require("./routes/user-notes-list-edit");
var dummyDataRouter = require('./routes/dummy-data');
var app = express();

// Middleware for the code
app.use(session({
  cookie: { },
  secret: 'secret',
  resave: false,
  saveUninitialized:false
}));

//require('dotenv').config()
const initilaizePassport = require("./passportConfig"); // NEED TO see the config page
const router = require("./routes/index");
initilaizePassport(passport);

// initializes passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const pg = require("pg");


  pool = new pg.Pool({
    user: 'docker',
    host: 'db',
    database: 'docker', 
    password: '1234',
  })




exports.pool = pool;

// view engine setup
//app.use(cookieParser(process.env.SESSION_SECRET));
app.use(cookieParser("secret"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// for flash messages 
app.use((req, res, next)=>{
  res.locals.errorMsg = req.flash("error");
  res.locals.successMsg = req.flash("success");
  next();
})

app.use(express.static('public'));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

router.use(connectFlash());

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/logout", logOutRouter);
app.use("/signup", signUpRouter);
app.use("/dashboard", dashboardRouter);
app.use("/users", usersRouter);
app.use("/add-playlist", addPlaylistRouter);
app.use("/view-videos", viewVideosRouter);
app.use("/edit-playlist", editPlaylistRouter);
app.use("/rename-playlist", renamePlaylistRouter);
app.use("/delete-playlist", deletePlaylistRouter);
app.use("/video-player", videoPlayerRouter);
app.use("/notes", notesRouter);
app.use("/add-video", addVideoRouter);
app.use("/submit-video", submitVideoRouter);
app.use("/delete-video", deleteVideoRouter);
app.use("/user-notes-list", notesListRouter);
app.use("/user-notes-list-edit", notesListRouterEdited);
app.use('/dummy-data', dummyDataRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

app.listen(4000);
