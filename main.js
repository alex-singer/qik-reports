const express = require("express");
const app = express();
const layouts = require("express-ejs-layouts");
const User = require("./models/user");

const router = require("./routes/index");

const port = 3000;

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
const Report = require("./models/report");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);
const expressValidator = require("express-validator");
const passport = require("passport");

const methodOverride = require("method-override");
app.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));

const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
app.use(cookieParser("secret_passcode"));
app.use(expressSession({
  secret: "secret_passcode",
  cookie: {
    maxAge:4000000
  },
  resave: false,
  saveUninitialized: false
}));

app.use(expressValidator());

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(connectFlash());

app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Now listening on port ${port}`)
});

