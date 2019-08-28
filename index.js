const express = require("express");
const app = express();
const layouts = require("express-ejs-layouts");

const port = 3000;

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
const Report = require("./models/report");

const reportController = require("./controllers/reportController");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);

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
app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/reports", reportController.index,
    reportController.indexView);
app.get("/reports/new", reportController.new);
app.post("/reports/create", reportController.create, 
    reportController.redirectView);
app.get("/reports/:id", reportController.show,
    reportController.showView);
app.get("/reports/:id/edit", reportController.edit);
app.put("/reports/:id/update", reportController.update,
    reportController.redirectView);
app.delete("/reports/:id/delete", reportController.delete,
    reportController.redirectView);

app.listen(port, () => {
  console.log(`Now listening on port ${port}`)
});

