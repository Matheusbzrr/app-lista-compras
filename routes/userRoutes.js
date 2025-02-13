const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const checkToken = require("../middlewares/checkToken");

router.get("/:id", checkToken, UserController.getUserById);
router.post("/:id/add", checkToken, UserController.addToShoppingList);
router.get("/:id/list", checkToken, UserController.getShoppingList);
router.put("/:id/update", checkToken, UserController.updateShoppingListItem);
router.delete("/:id/delete", checkToken, UserController.deleteShoppingListItem);
router.put("/:id/mark", checkToken, UserController.markAsPurchased);

module.exports = router;
