require("dotenv").config();
const app = require("./app.js");
const connectDB = require("./src/config/db.js");

connectDB(); // Conectar ao banco de dados

const port = process.env.PORT;
app.listen(port, () => console.log("Servidor rodando"));
