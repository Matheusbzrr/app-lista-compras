const userRepository = require("../repository/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (data) => {
  const userExists = await userRepository.getUserByEmail(data.email);
  if (userExists) {
    throw { status: 409, message: "E-mail já cadastrado!" };
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(data.password, salt);

  data.password = passwordHash;
  await userRepository.registerUser(data);
  return { msg: "Usuário criado com sucesso!" };
};

const loginUser = async (data) => {
  const user = await userRepository.getUserByEmail(data.email);
  if (!user) {
    throw { status: 401, message: "E-mail não cadastrado ou senha ausente!" };
  }

  const checkPassword = await bcrypt.compare(data.password, user.password);

  if (!checkPassword) {
    throw { status: 401, message: "Senha inválida!" };
  }

  const secret = process.env.SECRET;
  const token = jwt.sign({ id: user._id }, secret, { expiresIn: "8h" });

  return { msg: "Autenticado com sucesso!", token };
};

const getUserById = async (userId) => {
  const user = await userRepository.getUserById(userId);
  if (!user) {
    throw { status: 404, message: "Usuário não encontrado!" };
  }
  return user;
};

module.exports = { registerUser, loginUser, getUserById };
