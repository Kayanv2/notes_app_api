const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//configs
let userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

//criptografia senha
userSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    bcrypt.hash(this.password, 10, (err, Hashed) => {
      if (err) {
        next(err);
      } else {
        this.password = Hashed;
        next();
      }
    });
  }
});

//verifica se a senha esta correta
userSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, same) => {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

module.exports = mongoose.model("User", userSchema);
