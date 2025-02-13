const User = require("../model/usersModel");

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ msg: "Usuário não encontrado!" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor", error: err.message });
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

exports.getShoppingList = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "Usuário não encontrado!" });

    res.status(200).json({ shoppingList: user.shoppingList });
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor", error: err.message });
  }
};

exports.markAsPurchased = async (req, res) => {
  const { itemId } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findById(id);
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
  const { id } = req.params;
  const { itemId, name, quantity } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "Usuário não encontrado!" });

    const item = user.shoppingList.id(itemId);
    if (!item) return res.status(404).json({ msg: "Item não encontrado!" });

    if (name) item.name = name;
    if (quantity) item.quantity = quantity;

    await user.save();
    res.status(200).json({ msg: "Produto atualizado na lista de compras!" });
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor", error: err.message });
  }
};

exports.deleteShoppingListItem = async (req, res) => {
  const { id } = req.params;
  const { itemId } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "Usuário não encontrado!" });

    user.shoppingList = user.shoppingList.filter(
      (item) => item._id.toString() !== itemId
    );
    await user.save();

    res.status(200).json({ msg: "Produto removido da lista de compras!" });
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor", error: err.message });
  }
};
