const ShoppingListRepository = require("../repository/shoppingListRepository");
const {
  ShoppingListSchemaDTO,
  UpdateShoppingItemsDTO,
} = require("../dtos/shoppingList/shoppingListDto");

// criar lista de compras
const createShoppingList = async (data, userId) => {
  if (!data.totalPriceList) {
    // calcula o valor de cada item da lista e atribui ao preço total da lista
    data.totalPriceList = data.items.reduce(
      (total, item) => total + item.totalPriceItems,
      0
    );
  }

  const validatedData = ShoppingListSchemaDTO.parse({
    userId,
    items: data.items,
    totalPriceList: data.totalPriceList,
  });

  return await ShoppingListRepository.create(validatedData);
};

// pegar todas listas de compras do userId
const getShoppingListsByUserId = async (userId, page = 0, limit = 10) => {
  try {
    const offset = page * limit; // calcula o offset baseado na página solicitada
    const shoppingList = await ShoppingListRepository.findByUserId(
      userId,
      offset,
      limit
    );

    const formatResponseByUserId = shoppingList.map((list) => ({
      listId: list._id,
      items: list.items.map((item) => ({
        itemId: item._id,
        nameItem: item.nameItem,
        amountItem: item.amountItem,
        measurementUnit: item.measurementUnit,
        priceItem: item.priceItem,
        totalPriceItems: item.totalPriceItems,
      })),
      createdDate: list.createdAt,
      totalPriceList: list.totalPriceList,
    }));

    return formatResponseByUserId;
  } catch (err) {
    console.error("Erro ao buscar listas de compras: ", err);
  }

  return;
};

const getShoppingListByIdList = async (id) => {
  return await ShoppingListRepository.findByUserId(id);
};

// deletar lista de compras por userId

// atualizar lista de compras
const updateShoppingList = async (data, userId) => {
  const validatedData = UpdateShoppingItemsDTO.parse({
    userId,
    items: data.items,
  });

  return await ShoppingListRepository.update(userId, validatedData.items);
};

// busca lista de compras por id da lista

// deletar lista de compras por id da lista
const deleteShoppingList = async (id) => {
  return await ShoppingListRepository.delete(userId);
};

module.exports = {
  createShoppingList,
  updateShoppingList,
  getShoppingListsByUserId,
  deleteShoppingList,
};
