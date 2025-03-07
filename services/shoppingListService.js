const mongoose = require("mongoose");
const ShoppingList = require("../model/shoppingList");
const { ShoppingListSchema } = require("../dtos/shoppingListDto");

const createShoppingList = async (data, userId) => {
  // Validar os dados da lista inteira
  const validatedData = ShoppingListSchema.parse({
    userId, // Adicionando o userId na validação
    items: data.items, // Passando os itens da lista
  });

  // Criar uma lista de compras com todos os itens validados
  const shoppingList = new ShoppingList({
    userId: new mongoose.Types.ObjectId(validatedData.userId), // ID do usuário
    items: validatedData.items, // Todos os itens da lista
  });

  await shoppingList.save();

  return shoppingList;
};

module.exports = { createShoppingList };
