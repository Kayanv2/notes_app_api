const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://127.0.0.1/javascriptNote", {})
  .then(() => console.log("mongodb running"))
  .catch((err) => console.log(err));
