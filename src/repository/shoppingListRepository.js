const ShoppingList = require("../model/shoppingList");

const create = async (data) => {
  const shoppingList = new ShoppingList({
    userId: data.userId,
    items: data.items,
  });

  return await shoppingList.save();
};

const updateItem = async (data) => {
  // Atualizar o item dentro do array de `items`
  return await ShoppingList.findByIdAndUpdate(
    data.listId,
    {
      $set: {
        "items.$[elem].nameItem": data.item.nameItem,
        "items.$[elem].amountItem": data.item.amountItem,
        "items.$[elem].measurementUnit": data.item.measurementUnit,
      },
    },
    {
      new: true,
      arrayFilters: [{ "elem.itemId": data.itemId }],
    }
  ).exec();
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

module.exports = {
  create,
  findByUserId,
  findList,
  deleteList,
  deleteItemFromList,
  updateItem,
};
