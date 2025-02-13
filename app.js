require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const db = process.env.MONGO_URI;
// Open route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello, World!" });
});

mongoose.connect(db).then(() => {
  app.listen(4000);
  console.log("MongoDB Connected...");
});
