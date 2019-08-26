const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  name: String,
  code: String,
  address: {
    city: String,
    state: String
  }
});

module.exports = mongoose.model("Property", propertySchema);
