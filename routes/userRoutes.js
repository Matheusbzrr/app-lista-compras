const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const checkToken = require("../middlewares/checkToken");

router.get("/:id", checkToken, UserController.getUserById);
router.post("/:id/add", checkToken, UserController.addToShoppingList);
router.put("/update", checkToken, UserController.updateShoppingListItem);
router.delete("/delete", checkToken, UserController.deleteShoppingListItem);

module.exports = router;
