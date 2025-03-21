const userRepository = require("../repository/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (data) => {
  const userExists = await userRepository.getUserByEmail(data.email);
  if (userExists){
    throw {status: 409, message: "E-mail já cadastrado!"};
  } 
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  data.password = passwordHash;
  await userRepository.registerUser(data);
  return { msg: "Usuário criado com sucesso!" };
};

const loginUser = async (email, password) => {
  const user = userRepository.getUserByEmail(email);
  if (!user){
    throw {status: 401, message: "E-mail não cadastrado!" };
  } 

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword){
    throw {status: 401, message: "Senha inválida!" };
  } 

  const secret = process.env.SECRET;
  const token = jwt.sign({ id: user._id }, secret, { expiresIn: "8h" });

  return { msg: "Autenticado com sucesso!", token };
};


module.exports = { registerUser, loginUser };
