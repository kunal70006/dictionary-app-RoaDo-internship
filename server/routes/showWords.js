const express = require("express");
const Word = require("../models/db");
const router = express.Router();

// Getting Data from MongoDB and then sending it to front end
router.get("/", async (req, res) => {
  try {
    const words = await Word.find({});
    res.send(words.length > 0 ? words : "No data");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
