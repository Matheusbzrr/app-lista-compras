const shoppingListService = require("../services/shoppingListService");

const createShoppingList = async (req, res) => {
  try {
    const userId = req.userId; // Pegando userId do token JWT
    const data = req.body; // Pegando os itens do body

    const shoppingList = await shoppingListService.createShoppingList(
      data,
      userId
    );

    res.status(201);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Erro ao criar a lista de compras", error: err.message });
  }
};

module.exports = { createShoppingList };
