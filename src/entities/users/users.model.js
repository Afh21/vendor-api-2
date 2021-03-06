const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  documentNumber: { type: String },
  contactPhones: [String],
  created: { type: Date, default: Date.now() },
  imagePath: { type: String }
});

module.exports = mongoose.model("User", userSchema);
