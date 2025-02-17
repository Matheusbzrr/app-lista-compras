require("dotenv").config();
const app = require("/api/app");
const connectDB = require("./src/config/db.js");

connectDB();

module.exports = app;
