const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/authRoutes");
const shopping = require("./routes/shoppingRoutes");

const corsOptions = {
  origin: "http://127.0.0.1:5501",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/auth", authRoutes);

app.use("/shopping", shopping);

app.get("/home", (req, res) => {
  res.status(200).json({ msg: "Bem-vindo à API!" });
});

module.exports = app;
