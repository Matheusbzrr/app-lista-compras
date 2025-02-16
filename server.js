require("dotenv").config();
const app = require("./app.js");
const connectDB = require("./config/db");

connectDB();

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
