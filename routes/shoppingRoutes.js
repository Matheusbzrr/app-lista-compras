const express = require("express");
const router = express.Router();
const ShoppingListController = require("../controllers/shoppingController");
const ShoppingListService = require("../services/shoppingListService");
const ShoppingListRepository = require("../repository/shoppingListRepository");
const checkToken = require("../middlewares/checkToken");

const shoppingListRepository = new ShoppingListRepository();
const shoppingListService = new ShoppingListService(shoppingListRepository);
const shoppingListController = new ShoppingListController(shoppingListService);

// Criar um item na lista de compras
router.post(
  "/create",
  checkToken,
  shoppingListController.createShoppingList.bind(shoppingListController)
);
router.get(
  "/search",
  checkToken,
  shoppingListController.getShoppingListsByIdUser.bind(shoppingListController)
);
router.put(
  "/update/:id",
  checkToken,
  shoppingListController.updateShoppingList.bind(shoppingListController)
);
router.delete(
  "/delete/:id",
  checkToken,
  shoppingListController.deleteShoppingListByListId.bind(shoppingListController)
);

router.delete(
  "/item/:id",
  checkToken,
  shoppingListController.deleteItemInListById.bind(shoppingListController)
);

module.exports = router;
