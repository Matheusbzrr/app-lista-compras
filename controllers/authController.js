const UserService = require("../services/userService");
const UserDto = require("../dtos/userDto");
const { z } = require("zod");

const register = async (req, res) => {
  if (!req.body){
    return res.status(400).json({ msg: 'Preencha os dados corretamente' });
  }
  
  try {
      const validatedData = UserDto.userRegisterDTO.parse(req.body);
      const result = await UserService.registerUser(validatedData);
      res.status(201).json(result);
  } catch (error) {
   
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação dos dados",
        errors: error.errors, 
      });
    }

    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  if (!req.body){
    return res.status(400).json({ msg: 'Preencha os dados corretamente' });
  }  
  
  try {
      const validatedData = UserDto.userLoginDTO.parse(req.body);
      const result = await loginUser(validatedData.email, validatedData.password);
      res.status(200).json(result);
    } catch (error) {
   
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Erro de validação dos dados",
          errors: error.errors, 
        });
      }
  
      if (error.status) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  };

module.exports = { register, login };
