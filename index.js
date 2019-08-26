const express = require("express");
const app = express();

const port = 3000;

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("propInfo");
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`)
});

