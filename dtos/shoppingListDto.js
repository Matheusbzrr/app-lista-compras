const { z } = require("zod");

// Enum com as unidades de medida permitidas
const MeasurementUnitEnum = z.enum(["un", "kg", "g"]);

// Esquema de validação para um único item de compra
const ShoppingItemSchema = z.object({
  nameItem: z.string().min(1, "O nome do item é obrigatório"),
  amountItem: z.number().positive("A quantidade deve ser um número positivo"),
  measurementUnit: MeasurementUnitEnum,
  priceItem: z.number().positive("O preço do item deve ser positivo"),
  totalPriceItems: z.number().positive("O preço total deve ser positivo"),
  isActive: z.boolean().default(true), // Valor padrão true
});

// Esquema de validação para a lista de compras
const ShoppingListSchema = z.object({
  userId: z.string().min(1, "O ID do usuário é obrigatório"), // Aqui o ID é apenas validado como uma string não vazia
  items: z
    .array(ShoppingItemSchema)
    .min(1, "A lista de compras deve conter ao menos um item"), // Garante que a lista tenha pelo menos um item
  createdAt: z.date().optional(), // data de criação, caso seja passada, deve ser uma data válida
});

// Exportando para usar no Controller ou Service
module.exports = { ShoppingListSchema };
