const mongoose = require("mongoose");

const UserListSchema = new mongoose.Schema({
  logged:[String],
});

// compile model from schema
module.exports = mongoose.model("userlist", UserListSchema);