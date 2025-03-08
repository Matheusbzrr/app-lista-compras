const mongoose = require("mongoose");
const ShoppingList = require("../model/shoppingList");

class ShoppingListRepository {
  async create(data) {
    const shoppingList = new ShoppingList({
      userId: data.userId,
      items: data.items,
      totalPriceList: data.totalPriceList,
    });

    return await shoppingList.save();
  }

  async update(userId, items) {
    return await ShoppingList.findOneAndUpdate(
      { userId },
      { $set: { items } },
      { new: true }
    );
  }

  async findByUserId(userId, offset = 0, limit = 10) {
    return await ShoppingList.find({ userId }).skip(offset).limit(limit).exec();
  }

  async delete(userId) {
    return await ShoppingList.findOneAndDelete({
      userId: userId,
    });
  }
}

module.exports = new ShoppingListRepository();
