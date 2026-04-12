import { Elysia } from "elysia";
import {
  getRandomItemRouteSchema,
  getItemByIdRouteSchema,
  createItemRouteSchema,
  replaceItemRouteSchema,
  updateItemRouteSchema,
  deleteItemRouteSchema,
} from "../schemas/items.schemas";
import * as itemsController from "../controllers/items.controller";

export const itemsRoutes = new Elysia({ prefix: "/items" })
  .get("/", itemsController.getRandomItem, getRandomItemRouteSchema)
  .get("/:id", itemsController.getItemById, getItemByIdRouteSchema)
  .post("/", itemsController.createItem, createItemRouteSchema)
  .put("/:id", itemsController.replaceItem, replaceItemRouteSchema)
  .patch("/:id", itemsController.updateItem, updateItemRouteSchema)
  .delete("/:id", itemsController.deleteItem, deleteItemRouteSchema);
