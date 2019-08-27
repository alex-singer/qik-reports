const express = require("express");
const app = express();

const port = 3000;

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
const Report = require("./models/report");

const reportController = require("./controllers/reportController");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: false
  })
);

const methodOverride = require("method-override");
app.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));

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

