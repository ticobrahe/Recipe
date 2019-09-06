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

app.get("/api/recipes", (req, res) => {
  Recipe.find()
    .then(things => {
      res.status(200).json(things);
    })
    .catch(error => {
      res.status(400).json({
        error
      });
    });
});

app.get("/api/recipes/:id", (req, res) => {
  Recipe.findOne({ _id: req.params.id })
    .then(things => {
      res.status(200).json(things);
    })
    .catch(error => {
      res.status(400).json({
        error
      });
    });
});

app.put("/api/recipes/:id", (req, res) => {
  const recipe = new Recipe({
    _id: req.params.id,
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    difficulty: req.body.difficulty,
    time: req.body.time
  });
  Recipe.updateOne({ _id: req.params.id }, recipe)
    .then(() => {
      res.status(201).json({ message: "Recipe updated succesffully" });
    })
    .catch(error => {
      res.status(400).json({
        error
      });
    });
});

app.delete("/api/recipes/:id", (req, res) => {
  Recipe.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!"
      });
    })
    .catch(error => {
      res.status(400).json({
        error: error
      });
    });
});

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
