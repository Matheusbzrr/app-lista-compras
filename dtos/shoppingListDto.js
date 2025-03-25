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
    })
  ),
});

const responseShoppingListDto = z.array(
  z.object({
    listId: z.string(),
    items: z.array(
      z.object({
        itemId: z.string(),
        nameItem: z.string(),
        amountItem: z.number(),
        measurementUnit: MeasurementUnitEnum,
      })
    ),
    createdAt: z.date(),
  })
);

const updateShoppingItemsDTO = z.object({
  items: z.array(
    z.object({
      itemId: z.string(),
      nameItem: z.string(),
      amountItem: z.number(),
      measurementUnit: z.string(),
    })
  ),
});

// Exportando para usar no Controller ou Service
module.exports = {
  shoppingListSchemaDTO,
  updateShoppingItemsDTO,
  responseShoppingListDto,
};
