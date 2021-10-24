const mongoose = require("mongoose");

const NonUserSchema = new mongoose.Schema({
  email:String,
  access_code:String,
  role:String,
});

// compile model from schema
module.exports = mongoose.model("nonuser", NonUserSchema);