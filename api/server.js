require("dotenv").config();
const app = require("./app.js");
const connectDB = require("../src/config/db.js");

connectDB();

module.exports = app;
