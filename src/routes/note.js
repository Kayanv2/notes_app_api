const express = require("express");
const router = express.Router();
const Note = require("../models/note");
const withAuth = require("../middlewares/auth");

//criar nota
router.post("/", withAuth, async (req, res) => {
  const { title, body } = req.body;

  try {
    let note = new Note({ title, body, author: req.user._id });
    await note.save();
    res.status(200).json({ note });
  } catch (error) {
    res.status(500).json({ error: "erro ao criar a nota" });
  }
});

module.exports = router;
