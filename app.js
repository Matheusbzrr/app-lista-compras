const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./src/routes/authRoutes");

// CORS options
const corsOptions = {
  origin: "https://front-gold-sigma.vercel.app",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type",
};

// Aplicar o CORS antes de qualquer outra configuração
app.use(cors(corsOptions));
app.use(express.json());

// Rotas
app.use("/auth", authRoutes);

app.get("/home", (req, res) => {
  res.status(200).json({ msg: "Bem-vindo à API!" });
});

module.exports = app;
