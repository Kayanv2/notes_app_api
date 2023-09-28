const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: String,
  email: { type: string, unique: true, required: true },
  password: { type: string, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("User", userSchema);
