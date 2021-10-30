const express = require("express");
const Word = require("../models/db");

const router = express.Router();

// Getting a specific entry from MongoDB and forwarding it to front end
router.get("/:wordId", async (req, res) => {
  const query = req.params.wordId;
  try {
    const words = await Word.find({ id: query });
    res.send(words.length > 0 ? words : "No data");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
