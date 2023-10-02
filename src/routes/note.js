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

// garante que o usuario tem autorização para a nota
const isOwner = (user, note) => {
  if (JSON.stringify(user._id) === JSON.stringify(note.author._id)) {
    return true;
  } else {
    return false;
  }
};

//obter todas as notas
router.get("/", withAuth, async (req, res) => {
  try {
    let notes = await Note.find({ author: req.user._id });
    res.json({ notes });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

//atualizar nota
router.put("/:id", withAuth, async (req, res) => {
  try {
    const { title, body } = req.body;
    const { id } = req.params;

    let note = await Note.findById(id);
    if (isOwner(req.user, note)) {
      const filter = { _id: id };
      let note = await Note.findOneAndUpdate(
        filter,
        {
          $set: { title: title, body: body },
        },
        { upsert: true, new: true }
      );
      res.json(note);
    } else {
      res.json({ error: "acesso não autorizado" });
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

//deletar nota
router.delete("/:id", withAuth, async (req, res) => {
  const { id } = req.params;

  try {
    let note = await Note.findById(id);
    if (isOwner(req.user, note)) {
      await note.deleteOne();
      res.status(204).json({ message: "ok" });
    } else {
      res.json("nao autorizado");
    }
  } catch (error) {
    console.log(error);
    res.json("erro ao deletar a nota");
  }
});

//pesquisar notas
router.get("/search", withAuth, async (req, res) => {
  const { query } = req.query;

  try {
    let notes = await Note.find({
      author: req.user._id,
      $text: { $search: query },
    });

    res.json(notes);
  } catch (error) {
    console.log(error);
    res.json({ error: error }).status(500);
  }
});

//obter nota por id
router.get("/:id", withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    let note = await Note.findById(id);
    if (isOwner(req.user, note)) {
      res.json(note);
    } else {
      res.status(403).json({ error: "não autorizado" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "erro ao obter as notas" });
  }
});
module.exports = router;
