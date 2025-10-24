const express = require("express");
const Note = require("../models/Note");

const router = express.Router();

// GET notes by userId
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ msg: "User ID missing" });

    const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error("Fetch notes error:", err);
    res.status(500).json({ msg: "Server error, try again later" });
  }
});

// POST add new note
router.post("/", async (req, res) => {
  try {
    const { user, title, content } = req.body;
    if (!user || !title || !content) return res.status(400).json({ msg: "All fields required" });

    const note = new Note({ user, title, content });
    await note.save();
    res.json(note);
  } catch (err) {
    console.error("Add note error:", err);
    res.status(500).json({ msg: "Server error, try again later" });
  }
});

// Toggle favorite
router.put("/favorite/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: "Note not found" });

    note.favorite = !note.favorite;
    await note.save();

    res.json(note);
  } catch (err) {
    console.error("Toggle favorite error:", err);
    res.status(500).json({ msg: "Server error, try again later" });
  }
});

// PUT edit note
router.put("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!note) return res.status(404).json({ msg: "Note not found" });
    res.json(note);
  } catch (err) {
    console.error("Edit note error:", err);
    res.status(500).json({ msg: "Server error, try again later" });
  }
});

// DELETE note
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ msg: "Note deleted" });
  } catch (err) {
    console.error("Delete note error:", err);
    res.status(500).json({ msg: "Server error, try again later" });
  }
});

module.exports = router;
