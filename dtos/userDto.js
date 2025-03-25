const { z } = require("zod");

const userRegisterDTO = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const userLoginDTO = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const userResponseDTO = z.object({
  name: z.string(),
  email: z.string(),
});

module.exports = { userRegisterDTO, userLoginDTO, userResponseDTO };
