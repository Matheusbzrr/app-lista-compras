const mongoose = require("mongoose");
const ShoppingList = require("../model/shoppingList");

class ShoppingListRepository {
  //criar
  async create(data) {
    const shoppingList = new ShoppingList({
      userId: data.userId,
      items: data.items,
      totalPriceList: data.totalPriceList,
    });

    return await shoppingList.save();
  }

  // atualizar itens da lista
  async bulkWrite(operations) {
    try {
      const result = await ShoppingList.bulkWrite(operations);
      return result;
    } catch (error) {
      console.error("Erro ao realizar bulkWrite:", error);
      throw error;
    }
  }

  async findByUserId(userId, offset = 0, limit = 10) {
    return await ShoppingList.find({ userId }).skip(offset).limit(limit).exec();
  }

  async findList(listId) {
    return await ShoppingList.findById(listId);
  }
  async deleteList(listId) {
    return await ShoppingList.deleteOne({
      _id: listId,
    }).exec();
  }

  async deleteItemFromList(listId, itemId) {
    return await ShoppingList.updateOne(
      { _id: listId }, // Encontra a lista específica
      { $pull: { items: { _id: itemId } } } // Remove o item do array 'items'
    ).exec();
  }
}

module.exports = ShoppingListRepository;
