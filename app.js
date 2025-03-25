const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/authRoutes");
const shopping = require("./routes/shoppingRoutes");

// CORS options
const corsOptions = {
  origin: "https://front-gold-sigma.vercel.app",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

// Aplicar o CORS antes de qualquer outra configuração
app.use(cors(corsOptions));
app.use(express.json());

// Rotas
app.use("/auth", authRoutes);

app.use("/shopping", shopping);

module.exports = app;
