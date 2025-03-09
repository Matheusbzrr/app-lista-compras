const {
  ShoppingListSchemaDTO,
  UpdateShoppingItemsDTO,
  ZodError,
} = require("../dtos/shoppingListDto");

class ShoppingListController {
  constructor(shoppingListService) {
    this.service = shoppingListService;
  }
  async createShoppingList(req, res) {
    try {
      const userId = req.userId; // Pegando userId do token JWT
      const data = req.body; // Pegando os itens do body

      const validatedData = ShoppingListSchemaDTO.parse({
        userId,
        items: data.items,
        totalPriceList: data.totalPriceList,
      });

      await this.service.createShoppingList(validatedData);

      res.status(201).send();
    } catch (err) {
      res
        .status(500)
        .json({ msg: "Erro ao criar a lista de compras", error: err.message });
    }
  }

  async getShoppingListsByIdUser(req, res) {
    try {
      const userId = req.userId; // Pegando userId do token JWT
      const { page = 0, limit = 10 } = req.query; // na requisição controlo a paginação começando da pagina 0 com o limie que eu definir no front

      const pageValue = parseInt(page, 10);
      const limitValue = parseInt(limit, 10);

      const shoppingLists = await this.service.getShoppingListsByUserId(
        userId,
        pageValue,
        limitValue
      );
      res.status(200).send(shoppingLists);
    } catch (err) {
      res.status(500).json({
        msg: "Erro ao buscar as listas de compras",
        error: err.message,
      });
    }
  }

  async updateShoppingList(req, res) {
    try {
      const userId = req.userId; // Pegando userId do token JWT
      const listId = req.params.id; // Pegando o id da lista de compras

      // Valida os dados de entrada com DTO
      const validatedData = UpdateShoppingItemsDTO.parse(req.body);

      // Chama o service para atualizar os itens
      await this.service.updateItemPrices(userId, listId, validatedData);

      res.status(204).send();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({
          msg: "Dados inválidos",
          errors: err.errors, // Detalhes dos erros de validação
        });
      } else {
        // Outros erros (ex.: erro no banco de dados)
        res.status(500).json({
          msg: "Erro ao atualizar a lista de compras",
          error: err.message,
        });
      }
    }
  }

  async deleteShoppingListByListId(req, res) {
    try {
      const userId = req.userId; // Pegando userId do token JWT
      const listId = req.params.id; // Pegando o id da lista de compras
      await this.service.deleteShoppingList(userId, listId);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({
        msg: "Erro ao deletar a lista de compras",
        error: err.message,
      });
    }
  }

  async deleteItemInListById(req, res) {
    try {
      const listId = req.params.id; // Pegando o id da lista de compras
      const { itemId } = req.body; // Pegando o id do item
      await this.service.deleteItemInList(listId, itemId);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({
        msg: "Erro ao deletar o item da lista de compras",
        error: err.message,
      });
    }
  }
}

module.exports = ShoppingListController;
