const express = require("express");
const router = require("./src/routes");
const app = express();
require("./config/database");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server ok");
});
