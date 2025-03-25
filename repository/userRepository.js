const User = require("../model/usersModel");

const registerUser = async (data) => {
  const user = new User(data);
  await user.save();
};

const getUserById = async (id) => {
  const user = await User.findById(id).select("-password"); // -password para não retornar a senha do usuário na resposta
  return user;
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  registerUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
};
