const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Rota para registro de usuário
router.post("/register", authController.register);

// Rota para login de usuário
router.post("/login", authController.login);

// Rota para obter usuário por ID
router.get("/:id", authController.getUserById);

module.exports = router;
