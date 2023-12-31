const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_TOKEN;

//REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  try {
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ error: "email ou senha incorreta" });
    } else {
      user.isCorrectPassword(password, function (err, same) {
        if (!same) {
          res.status(501).json({ error: "email ou senha incorreta" });
        } else {
          let token = jwt.sign({ email }, secret, { expiresIn: "10d" });

          res.json({ user: user, token });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

module.exports = router;
