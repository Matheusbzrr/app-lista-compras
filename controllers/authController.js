const {
  registerUser,
  loginUser,
  getUserById,
} = require("../services/userService");
const { userRegisterSchema, userLoginSchema } = require("../dtos/userDto");
const validate = require("../middlewares/validateMiddleware");

exports.register = [
  validate(userRegisterSchema),
  async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const result = await registerUser(name, email, password);
      res.status(201).json(result);
    } catch (err) {
      res.status(422).json({ msg: err.message });
    }
  },
];

exports.login = [
  validate(userLoginSchema),
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await loginUser(email, password);
      res.status(200).json(result);
    } catch (err) {
      res.status(422).json({ msg: err.message });
    }
  },
];

const userService = require("../services/userService");

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.userId); // Usa o ID injetado pelo checkToken no token
    res.status(200).json({ user });
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};
