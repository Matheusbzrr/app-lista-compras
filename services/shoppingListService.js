class ShoppingListService {
  constructor(shoppingListRepository) {
    this.repository = shoppingListRepository;
  }

  async createShoppingList(data) {
    if (!data.totalPriceList) {
      // Calcula o valor de cada item da lista e atribui ao preço total da lista
      data.totalPriceList = data.items.reduce(
        (total, item) => total + item.totalPriceItems,
        0
      );
    }

    return await this.repository.create(data);
  }

  async getShoppingListsByUserId(userId, page = 0, limit = 10) {
    try {
      const offset = page * limit; // Calcula o offset baseado na página solicitada
      const shoppingList = await this.repository.findByUserId(
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
  }

  async getShoppingListByIdList(id) {
    return await this.repository.findByUserId(id);
  }

  async updateItemPrices(userId, listId, items) {
    try {
      // Busca a lista
      const list = await this.repository.findList(listId);

      if (!list) {
        throw new Error("Lista não encontrada");
      }

      // Verifica se o userId da lista corresponde ao userId recebido
      if (String(list.userId) !== userId) {
        throw new Error("Não autorizado");
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
        const result = await this.repository.bulkWrite(updateOperations);

        console.log(`Itens atualizados: ${result.modifiedCount}`);
        console.log(`Preço total atualizado para: ${newTotalPriceList}`);
        console.log(`Operações realizadas: ${JSON.stringify(result, null, 2)}`);
      } else {
        console.log("Nenhuma atualização necessária.");
      }
    } catch (error) {
      console.error("Erro ao atualizar preços:", error);
      throw error;
    }
  }

  async deleteShoppingList(userId, listId) {
    try {
      const list = await this.repository.findList(listId);
      if (!list) {
        throw new Error("Lista não encontrada");
      }
      if (String(list.userId) !== userId) {
        throw new Error("Não autorizado");
      }

      console.log(typeof listId);

      return await this.repository.deleteList(listId);
    } catch (error) {
      console.error("Erro ao excluir lista:", error);
      throw error;
    }
  }

  async deleteItemInList(listId, itemId) {
    try {
      await this.repository.deleteItemFromList(listId, itemId);
    } catch (err) {
      console.error("Erro ao excluir item da lista:", err);
      throw err;
    }
  }
}

module.exports = ShoppingListService;
