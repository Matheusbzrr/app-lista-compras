const User = require("../model/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ msg: "Dados inválidos!" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(422).json({ msg: "E-mail já cadastrado!" });

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({ name, email, password: passwordHash });

  try {
    await user.save();
    res.status(201).json({ msg: "Usuário criado com sucesso!" });
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: "Usuário não encontrado!" });

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) return res.status(422).json({ msg: "Senha inválida!" });

  const secret = process.env.SECRET;
  const token = jwt.sign({ id: user._id }, secret);

  try {
    res
      .status(200)
      .json({ msg: "Autenticado com sucesso!", token, userId: user._id });
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.getUserById = async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id, "-password");
  if (!user) return res.status(404).json({ msg: "Usuário não encontrado!" });

  res.status(200).json({ user });
};
