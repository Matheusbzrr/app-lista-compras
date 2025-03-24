require("dotenv").config();
const app = require("./app.js");
const connectDB = require("./config/db");

connectDB();

const port = process.env.PORT;
app.listen(port, () => console.log("Servidor rodando"));
