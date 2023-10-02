const express = require("express");
const app = express();
require("./config/database");
const userRoutes = require("./src/routes/user");
const noteRoutes = require("./src/routes/note");
const Note = require("./src/models/note");

//CONFIGS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server ok");
});

//ROUTES
app.use("/users", userRoutes);
app.use("/notes", noteRoutes);
