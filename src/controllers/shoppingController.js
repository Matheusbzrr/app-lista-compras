const ShoppingListDto = require("../dtos/shoppingListDto");
const ShoppingListService = require("../services/shoppingListService");
const { z } = require("zod");

const createShoppingList = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ msg: "Preencha os dados corretamente" });
  }

  const userId = req.userId;
  try {
    const data = req.body; // Pegando os itens do body
    const validatedData = ShoppingListDto.shoppingListSchemaDTO.parse({
      userId: userId,
      items: data.items,
    });

    await ShoppingListService.createShoppingList(validatedData);

    res.status(201).json("Lista de compras criada!");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação dos dados",
        errors: error.errors,
      });
    }

    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const getAllShoppingListsByIdUser = async (req, res) => {
  try {
    const userId = req.userId; // Pegando userId do token JWT
    const shoppingLists = await ShoppingListService.getAllListByUserId(userId);

    const listDto =
      ShoppingListDto.responseShoppingListDto.parse(shoppingLists);
    // talvez passar um response dependendo do resultado dps de testar isso lembra disso
    res.status(200).send(listDto);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação dos dados",
        errors: error.errors,
      });
    }

    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const updateListAndItemInShoppingList = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ msg: "Preencha os dados corretamente" });
  }
  try {
    const listId = req.params.id; // Pegando o id do item ou lista
    const item = req.body
    const data = { listId, item }; // como estou passando um dto como objeto, la no repositorio vou ter qeu acessar o validatedData

    // Chama o service para atualizar os itens
    await ShoppingListService.updateItem(data);

    res.status(204).json();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação dos dados",
        errors: error.errors,
      });
    }

    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const deleteShoppingListByListId = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ msg: "Informe uma lista" });
  }

  try {
    const userId = req.userId; // Pegando userId do token JWT
    const listId = req.params.id; // Pegando o id da lista de compras
    await ShoppingListService.deleteShoppingList(userId, listId);
    res.status(204).send();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação dos dados",
        errors: error.errors,
      });
    }

    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const deleteItemInListById = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ msg: "Informe o item" });
  }

  try {
    const listId = req.params.id; 
    const { itemId } = req.body; 
    await ShoppingListService.deleteItemInList(listId, itemId);
    res.status(204).send();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação dos dados",
        errors: error.errors,
      });
    }

    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createShoppingList,
  getAllShoppingListsByIdUser,
  updateListAndItemInShoppingList,
  deleteShoppingListByListId,
  deleteItemInListById,
};
