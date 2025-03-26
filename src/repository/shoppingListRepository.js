const ShoppingList = require("../model/shoppingList");

const create = async (data) => {
  const shoppingList = new ShoppingList({
    userId: data.userId,
    items: data.items,
  });

  return await shoppingList.save();
};

const updateList = async (data) => {
  // Para atualizar um item existente
  if (data.item.itemId) {
    return await ShoppingList.findOneAndUpdate(
      {
        _id: data.listId,
        "items._id": data.item.itemId,
      },
      {
        $set: {
          "items.$.nameItem": data.item.nameItem,
          "items.$.amountItem": data.item.amountItem,
          "items.$.measurementUnit": data.item.measurementUnit,
        },
      },
      { new: true }
    );
  }

  return await ShoppingList.findByIdAndUpdate(
    data.listId,
    {
      $push: {
        items: {
          nameItem: data.item.nameItem,
          amountItem: data.item.amountItem,
          measurementUnit: data.item.measurementUnit,
        },
      },
    },
    { new: true }
  );
};

// Adicionar função para remover item
const removeItem = async (listId, itemId) => {
  return await ShoppingList.findByIdAndUpdate(
    listId,
    {
      $pull: {
        items: { _id: new ObjectId(itemId) },
      },
    },
    { new: true }
  );
};

const findListsByUserId = async (userId, offset, limit) => {
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
  findListsByUserId,
  findList,
  deleteList,
  deleteItemFromList,
  updateList,
  removeItem,
};
