const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const checkToken = require("../middlewares/checkToken");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/perfil", checkToken, authController.getUserById);

module.exports = router;
