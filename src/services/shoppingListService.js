const ShoppingListRepository = require("../repository/shoppingListRepository");

const createShoppingList = async (data) => {
  const lista = await ShoppingListRepository.create(data);

  if (!lista) {
    throw { status: 500, message: "Erro ao salvar a Lista" };
  }
};

const getAllListByUserId = async (userId) => {
  const page = 0; // Página solicitada
  const limit = 10; // Limite de itens por página
  const offset = page * limit; // Calcula o offset baseado na página solicitada
  const shoppingList = await ShoppingListRepository.findByUserId(
    userId,
    offset,
    limit
  );

  if (!shoppingList) {
    throw { status: 404, message: "Nenhuma Lista encontrada" };
  }

  // avaliar dps o uso desse map pra formatar a resposta ou se eu so passo um dto no controller

  const formatList = shoppingList.map((list) => ({
    listId: list._id.toString(), // Convertendo para string se for um ObjectId
    items: list.items.map((item) => ({
      itemId: item._id.toString(), // Convertendo para string se for um ObjectId
      nameItem: item.nameItem,
      amountItem: item.amountItem,
      measurementUnit: item.measurementUnit,
    })),
    createdAt: list.createdAt,
  }));

  return formatList;
};

const getShoppingListByIdList = async (idList) => {
  const allList = await ShoppingListRepository.findList(idList);
  if (!allList) {
    throw { status: 404, message: "Lista não encontrada" };
  }

  return allList;
};

const updateList = async (listId, data) => {
  const list = await ShoppingListRepository.updateItem(
    listId,
    { $set: { items: data } },
    { new: true }
  );

  if (!list) {
    throw { status: 500, message: "Erro ao atualizar a Lista" };
  }
};

const deleteShoppingList = async (userId, listId) => {
  const list = await ShoppingListRepository.findList(listId);
  if (!list) {
    throw { status: 404, message: "Lista não encontrada" };
  }
  if (String(list.userId) !== userId) {
    throw { status: 401, message: "Não autorizado" };
  }

  return await ShoppingListRepository.deleteList(listId);
};

const deleteItemInList = async (listId, itemId) => {
  const list = await ShoppingListRepository.deleteItemFromList(listId, itemId);
  if (!list) {
    throw { status: 404, message: "Item não encontrado" };
  }
  return list;
};

module.exports = {
  createShoppingList,
  getAllListByUserId,
  getShoppingListByIdList,
  updateList,
  deleteShoppingList,
  deleteItemInList,
};
