const express = require("express");
const router = express.Router();
const shoppingController = require("../controllers/shoppingController");
const checkToken = require("../middlewares/checkToken");

// Criar um item na lista de compras
router.post("/create", checkToken, shoppingController.createShoppingList);
router.get("/search", checkToken, shoppingController.getShoppingListsByIdUser);

// Listar todos os itens do usuário autenticado
// router.get("/", checkToken, shoppingController.getShoppingList);

module.exports = router;
