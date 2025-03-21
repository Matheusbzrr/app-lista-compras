const { z } = require("zod");


const MeasurementUnitEnum = z.enum(["Un", "Kg", "g", "L"]);

const shoppingListSchemaDTO = z.object({
  userId: z.string().min(1, "O ID do usuário é obrigatório"), // Aqui o ID é apenas validado como uma string não vazia
  items: z.array(
    z.object({
      nameItem: z.string().min(1, "O nome do item é obrigatório"),
      amountItem: z
        .number()
        .positive("A quantidade deve ser um número positivo"),
      measurementUnit: MeasurementUnitEnum,
      totalPriceItems: z.number().optional().default(0),
      isActive: z.boolean().default(true),
    })
  ),
  totalPriceList: z.number().optional().default(0),
});

const updateShoppingItemsDTO = z.array(
  z.object({
    itemId: z.string(),
    nameItem: z.string().optional(),
    amountItem: z.number().optional(),
    measurementUnit: MeasurementUnitEnum.optional(),
    totalPriceItems: z
      .number()
      .optional()
      .default(0)
      .refine(
        (value) => value === undefined || value >= 0, // Validação personalizada
        {
          message: "priceItem deve ser um número positivo", // Mensagem de erro
        }
      ),
    isActive: z.boolean().optional(),
  })
);
// Exportando para usar no Controller ou Service
module.exports = {
  shoppingListSchemaDTO,
  updateShoppingItemsDTO,
};
