const ShoppingListRepository = require("../repository/shoppingListRepository");

const createShoppingList =  async (data) => {
    if (!data.totalPriceList) {
      // Calcula o valor de cada item da lista e atribui ao preço total da lista
      data.totalPriceList = data.items.reduce(
        (total, item) => total + item.totalPriceItems,
        0
      );
    }

    return await ShoppingListRepository.create(data);
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
        throw {status: 404, message: "Nenhuma Lista encontrada"};
      }


      // avaliar dps o uso desse map pra formatar a resposta ou se eu so passo um dto no controller

      // const formatList = shoppingList.map((list) => ({
      //   listId: list._id,
      //   items: list.items.map((item) => ({
      //     itemId: item._id,
      //     nameItem: item.nameItem,
      //     amountItem: item.amountItem,
      //     measurementUnit: item.measurementUnit,
      //     priceItem: item.priceItem,
      //     totalPriceItems: item.totalPriceItems,
      //   })),
      //   createdDate: list.createdAt,
      //   totalPriceList: list.totalPriceList,
      // }));

      return shoppingList;
};

const getShoppingListByIdList =  async (idList) => {
    const allList = await ShoppingListRepository.findList(idList);
    if (!allList) {
      throw {status: 404, message: "Lista não encontrada"};
    }

    return allList;

};

const updateItemPrices =  async (userId, listId, items) => {
      // Busca a lista
      const list = await ShoppingListRepository.findList(listId);

      if (!list) {
        throw {status: 404, message: "Lista não encontrada"};
      }

      // Verifica se o userId da lista corresponde ao userId recebido
      if (String(list.userId) !== userId) {
        throw {status: 401, message: "Não autorizado"};
      }

      const updatedItemsMap = new Map(
        items.map((updatedItem) => [updatedItem.itemId, updatedItem])
      );

      // Prepara as operações de atualização para todos os itens
      const updateOperations = items
        .map((updatedItem) => {
          const itemIndex = list.items.findIndex(
            (item) => String(item._id) === updatedItem.itemId
          );

          if (itemIndex !== -1) {
            // Para cada item, copia o item original e substitui apenas os campos passados
            const item = list.items[itemIndex];
            const updatedData = { ...item._doc, ...updatedItem };

            // Cria a represetançaõ do metodo updateOne nativo do mongo para enviar como operação a ser excutada no bulkWrite
            return {
              updateOne: {
                filter: { _id: listId, "items._id": updatedItem.itemId },
                update: { $set: { "items.$": updatedData } },
              },
            };
          }
        })
        .filter(Boolean); // Remove qualquer operação de update inválida

      // Se houver operações de update, faz a atualização em massa
      if (updateOperations.length > 0) {
        // Calcula o novo preço total da lista começando do zero
        const newTotalPriceList = list.items.reduce((total, item) => {
          const updatedItem = updatedItemsMap.get(String(item._id));
          // Usa o valor atualizado se existir, caso contrário, usa o valor original
          const itemPrice = updatedItem
            ? updatedItem.totalPriceItems
            : item.totalPriceItems;
          return total + itemPrice;
        }, 0);

        // Adiciona a operação de atualização do preço total na lista
        updateOperations.push({
          updateOne: {
            filter: { _id: listId },
            update: { $set: { totalPriceList: newTotalPriceList } },
          },
        });
        const result = await ShoppingListRepository.bulkWrite(updateOperations);

        console.log(`Itens atualizados: ${result.modifiedCount}`);
        console.log(`Preço total atualizado para: ${newTotalPriceList}`);
        console.log(`Operações realizadas: ${JSON.stringify(result, null, 2)}`);
      } else {
        console.log("Nenhuma atualização necessária.");
      }
    
};

const deleteShoppingList =  async (userId, listId) => {
      const list = await ShoppingListRepository.findList(listId);
      if (!list) {
        throw {status: 404, message: "Lista não encontrada"};
      }
      if (String(list.userId) !== userId) {
        throw {status: 401, message: "Não autorizado"};
      }

      console.log(typeof listId);

      return await ShoppingListRepository.deleteList(listId);
};

const deleteItemInList = async (listId, itemId) => {
  const list = await ShoppingListRepository.deleteItemFromList(listId, itemId);
  if (!list) {
    throw {status: 404, message: "Item não encontrado"};
  }
  return list;
};


module.exports = {createShoppingList, getAllListByUserId, getShoppingListByIdList, updateItemPrices, deleteShoppingList, deleteItemInList};
