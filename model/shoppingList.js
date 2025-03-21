const mongoose = require("mongoose");

// estrutura de itens
const ItemSchema = new mongoose.Schema({
  // cada item tem seu proprio id que pode ser acessado data.id
  nameItem: { type: String, required: true },
  amountItem: { type: Number, required: true },
  measurementUnit: { type: String, enum: ["Un", "Kg", "g", "L"], required: true },
  totalPriceItems: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
});

// estrutura de relação com o usuario
const ShoppingListSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [ItemSchema], // aqui cada item ira compor uma lista
  createdAt: { type: Date, default: Date.now },
  totalPriceList: { type: Number, default: 0 },
});


// junta tudo antes de exportar
const ShoppingList = mongoose.model("ShoppingList", ShoppingListSchema);
module.exports = ShoppingList;
