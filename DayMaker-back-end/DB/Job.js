const mongoose = require("mongoose");
const JobSchema = new mongoose.Schema({
  userId: String,
  workName: String,
  workStartTime: String,
  workEndTime: String,
  location: String,
  rem1: String,
  rem2: String,
  rem3: String,
});

module.exports = mongoose.model("Jobs", JobSchema);
