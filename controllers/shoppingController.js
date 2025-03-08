const shoppingListService = require("../services/shoppingListService");

const createShoppingList = async (req, res) => {
  try {
    const userId = req.userId; // Pegando userId do token JWT
    const data = req.body; // Pegando os itens do body

    await shoppingListService.createShoppingList(data, userId);

    res.status(201).send();
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Erro ao criar a lista de compras", error: err.message });
  }
};

const getShoppingListsByIdUser = async (req, res) => {
  try {
    const userId = req.userId; // Pegando userId do token JWT
    const { page = 0, limit = 10 } = req.query; // na requisição controlo a paginação começando da pagina 0 com o limie que eu definir no front

    const pageValue = parseInt(page, 10);
    const limitValue = parseInt(limit, 10);

    const shoppingLists = await shoppingListService.getShoppingListsByUserId(
      userId,
      pageValue,
      limitValue
    );
    res.status(200).send(shoppingLists);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Erro ao buscar as listas de compras", error: err.message });
  }
};

module.exports = { createShoppingList, getShoppingListsByIdUser };
