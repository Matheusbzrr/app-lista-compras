const express = require("express");
const router = express.Router();
const shoppingListController = require("../controllers/shoppingController");
const checkToken = require("../middlewares/checkToken");


// Criar um item na lista de compras
router.post(
  "/create",
  checkToken,
  shoppingListController.createShoppingList
);
router.get(
  "/search",
  checkToken,
  shoppingListController.getAllShoppingListsByIdUser
);
router.put(
  "/update/:id",
  checkToken,
  shoppingListController.updateShoppingList
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
