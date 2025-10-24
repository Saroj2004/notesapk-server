const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  user: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  favorite: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);
