const express = require("express");
const dotenv = require("dotenv").config();
const fetch = require("node-fetch");
const Word = require("../models/db");

const router = express.Router();

const headers = {
  app_id: process.env.APP_ID,
  app_key: process.env.APP_KEY,
};

const baseUrl = process.env.BASE_API_URL;

router.post("/:wordId", async (req, res) => {
  try {
    const word = req.params.wordId;
    const URL = `${baseUrl}/entries/en-gb/${word}`;
    const data = await getDataFromApi(URL, word);

    if (JSON.stringify(data) === "{}") {
      res.sendStatus(404);
    } else {
      // Sending data to db
      const post = new Word({
        id: data.id,
        origin: data.origin,
        type: data.typeArr,
        definition: data.definitionsArr,
        examples: data.examplesArr,
      });

      post.save();
      res.json(data);
    }
  } catch (err) {
    console.log(err);
  }
});

// Getting data from API
const getDataFromApi = async (url, word) => {
  try {
    const res = await fetch(url, { headers: headers });
    const data = await res.json();
    if (data.error) {
      return "error";
    } else {
      const finalData = processData(data.results, word);
      return finalData;
    }
  } catch (err) {
    return err;
  }
};

// Processing Data
const processData = (data, word) => {
  const usefulData = {
    id: word,
    origin: "",
    typeArr: [],
    definitionsArr: [],
    examplesArr: [],
  };
  try {
    usefulData.origin = data[0].lexicalEntries[0].entries[0].etymologies[0];

    data[0].lexicalEntries.map((obj) => {
      usefulData.typeArr.push(obj.lexicalCategory.text);
      obj.entries.map((obj1) => {
        usefulData.definitionsArr.push(
          obj1.senses[0].definitions[0]
            ? obj1.senses[0].definitions[0]
            : "{No Definition Found}"
        );
        if (obj1.senses[0].examples !== undefined) {
          usefulData.examplesArr.push(obj1.senses[0].examples[0].text);
        } else if (obj1.senses[0].subsenses !== undefined) {
          usefulData.examplesArr.push(
            obj1.senses[0].subsenses[0].examples[0].text
          );
        } else {
          usefulData.examplesArr.push("{No Example Found}");
        }
      });
    });
    return usefulData;
  } catch (err) {
    return err;
  }
};

module.exports = router;
