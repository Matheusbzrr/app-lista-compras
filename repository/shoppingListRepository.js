const ShoppingList = require("../model/shoppingList");

const create = async (data) => {
    const shoppingList = new ShoppingList({
      userId: data.userId,
      items: data.items,
      totalPriceList: data.totalPriceList,
    });

    return await shoppingList.save();
};

  // atualizar itens da lista
const bulkWrite = async (operations) => {  
      const result = await ShoppingList.bulkWrite(operations);
      return result;
};

const findByUserId = async (userId, offset, limit) => {
    return await ShoppingList.find({ userId }).skip(offset).limit(limit).exec();
};

const findList = async (listId) => {
    return await ShoppingList.findById(listId);
};
const deleteList = async (listId) => {
    return await ShoppingList.deleteOne({
      _id: listId,
    }).exec();
};

const deleteItemFromList = async (listId, itemId) => {
    return await ShoppingList.updateOne(
      { _id: listId }, // Encontra a lista específica
      { $pull: { items: { _id: itemId } } } // Remove o item do array 'items'
    ).exec();
};


module.exports = { create, findByUserId, findList, deleteList, deleteItemFromList, bulkWrite };
