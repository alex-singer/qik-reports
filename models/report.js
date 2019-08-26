const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  brand: String,
  flag: String,
  code: String,
  address: {
    city: String,
    state: String
  }
});

reportSchema.virtual("fullAddress")
  .get(function() {
    return `${this.address.city}, ${this.address.state}`;
});

module.exports = mongoose.model("Report", reportSchema);
