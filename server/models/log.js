const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  userId: String,
  loggedIn:Boolean,
  logintime: [Date],
  logouttime: [Date],
});

// compile model from schema
module.exports = mongoose.model("log", LogSchema);
