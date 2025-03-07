const User = require("../model/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (name, email, password) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("E-mail já cadastrado!");

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({ name, email, password: passwordHash });
  await user.save();
  return { msg: "Usuário criado com sucesso!" };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Usuário não encontrado!");

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) throw new Error("Senha inválida!");

  const secret = process.env.SECRET;
  const token = jwt.sign({ id: user._id }, secret);

  return { msg: "Autenticado com sucesso!", token };
};

const getUserById = async (id) => {
  const user = await User.findById(id, "-password");
  if (!user) throw new Error("Usuário não encontrado!");
  return user;
};

module.exports = { registerUser, loginUser, getUserById };
