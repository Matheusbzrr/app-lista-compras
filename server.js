require("dotenv").config();
const app = require("./app.js");
const connectDB = require("./src/config/db.js");

connectDB(); // Conectar ao banco de dados

const PORT = process.env.PORT || 5000; // Escolher a porta de ambiente ou uma porta padrão

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
