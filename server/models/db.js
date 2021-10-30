const mongoose = require("mongoose");

// Making a mongoDB schema
const db = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  type: {
    type: [String],
    required: true,
  },
  definition: {
    type: [String],
    required: true,
  },
  examples: {
    type: [String],
    required: true,
  },
});

const Word = mongoose.model("Word", db);

module.exports = Word;
