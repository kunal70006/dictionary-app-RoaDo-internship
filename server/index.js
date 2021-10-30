const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const handleWords = require("./routes/handleWords");
const showWords = require("./routes/showWords");
const wordDetails = require("./routes/wordDetails");

// Middleware
app.use(cors());
app.use(express.json());
app.use("/add", handleWords);
app.use("/", showWords);
app.use("/word", wordDetails);

const uri = `mongodb+srv://kunal70006:${process.env.MONGO_PASS}@node.yxray.mongodb.net/node?retryWrites=true&w=majority`;

// Connecting to DB
const main = () => {
  mongoose
    .connect(uri, { useNewUrlParser: true })
    .then(() => {
      console.log("Connected to MongoDB...");
    })
    .catch((error) => {
      console.log("Error: ", error.message);
    });
};

main();

app.listen(5000);
