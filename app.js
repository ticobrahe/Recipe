const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Recipe = require("./models/recipe");

const app = express();

mongoose
  .connect(
    "mongodb+srv://tico:sgzyzVM16wEgbv6T@cluster0-jbvpv.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("succesffully connected to MongoDB Atlass");
  })
  .catch(err => {
    console.log("Unable to connect to MongoDB");
    console.error(err);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.post("/api/recipes", (req, res) => {
  const recipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    difficulty: req.body.difficulty,
    time: req.body.time
  });
  recipe
    .save()
    .then(() => {
      res.status(201).json({ message: "Recipe created" });
    })
    .catch(err => {
      res.status(400).json({ err });
    });
});

module.exports = app;
