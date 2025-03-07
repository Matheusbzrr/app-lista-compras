const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const checkToken = require("../middlewares/checkToken");

// Rota para registro de usuário
router.post("/register", authController.register);

// Rota para login de usuário
router.post("/login", authController.login);

// Rota para obter usuário por ID, esse id tvem da ijeção  no token feito por checkToken
router.get("/perfil", checkToken, authController.getUserById);

module.exports = router;
