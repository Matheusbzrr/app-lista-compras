const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./src/routes/authRoutes");
const shopping = require("./src/routes/shoppingRoutes");

const corsOptions = {
  origin: "front-gold-sigma.vercel.app",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/auth", authRoutes);

app.use("/shopping", shopping);

module.exports = app;
