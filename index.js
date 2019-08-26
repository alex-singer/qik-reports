const express = require("express");
const app = express();

const port = 3000;

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
const Property = require("./models/property");

const propertyController = require("./controllers/propertyController");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: false
  })
);

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/reports/new", propertyController.new);
app.post("/reports/create", propertyController.create, 
    propertyController.redirectView);

app.listen(port, () => {
  console.log(`Now listening on port ${port}`)
});

