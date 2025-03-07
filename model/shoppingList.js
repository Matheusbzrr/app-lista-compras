const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  nameItem: { type: String, required: true },
  amountItem: { type: Number, required: true },
  measurementUnit: { type: String, enum: ["un", "kg", "g"], required: true },
  priceItem: { type: Number, required: true },
  totalPriceItems: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
});

const ShoppingListSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [ItemSchema], // Aqui cada lista terá vários itens
  createdAt: { type: Date, default: Date.now }
});

const ShoppingList = mongoose.model("ShoppingList", ShoppingListSchema);
module.exports = ShoppingList;
