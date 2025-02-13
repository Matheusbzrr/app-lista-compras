const User = require("../model/usersModel");

exports.getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password"); // Remove a senha da resposta
    if (!user) return res.status(404).json({ msg: "Usuário não encontrado!" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.addToShoppingList = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "Usuário não encontrado!" });

    user.shoppingList.push({ name, quantity });
    await user.save();

    res.status(200).json({ msg: "Produto adicionado à lista de compras!" });
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.markAsPurchased = async (req, res) => {
  const { itemId } = req.body;
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "Usuário não encontrado!" });

    const item = user.shoppingList.id(itemId);
    if (!item) return res.status(404).json({ msg: "Item não encontrado!" });

    item.purchased = true;
    await user.save();

    res.status(200).json({ msg: "Item marcado como comprado!", item });
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor", error: err.message });
  }
};

exports.updateShoppingListItem = async (req, res) => {
  const { userId, itemId, name, price, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "Usuário não encontrado!" });

    const item = user.shoppingList.id(itemId);
    if (!item) return res.status(404).json({ msg: "Item não encontrado!" });

    item.name = name;
    item.price = price;
    item.quantity = quantity;
    await user.save();

    res.status(200).json({ msg: "Produto atualizado na lista de compras!" });
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.deleteShoppingListItem = async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "Usuário não encontrado!" });

    user.shoppingList.id(itemId).remove();
    await user.save();

    res.status(200).json({ msg: "Produto removido da lista de compras!" });
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};
