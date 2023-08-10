const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: String,
  city: String,
  email: String,
  password: String,
  cnfPassword: String,
});

module.exports = mongoose.model("Users", UserSchema);
