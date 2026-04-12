import type { Context } from "elysia";
import type {
  GetRandomItemRouteContract,
  GetItemByIdRouteContract,
  CreateItemRouteContract,
  ReplaceItemRouteContract,
  UpdateItemRouteContract,
  DeleteItemRouteContract,
} from "../schemas/items.schemas";
import * as itemsService from "../services/items.service";

export const getRandomItem = ({
  set,
}: Context<GetRandomItemRouteContract>): GetRandomItemRouteContract["response"][200 | 404] => {
  const item = itemsService.getRandomItem();
  if (!item) {
    set.status = 404;
    return { error: "No items in the list" };
  }
  return item;
};

export const getItemById = ({
  params,
  set,
}: Context<GetItemByIdRouteContract>): GetItemByIdRouteContract["response"][200 | 404] => {
  const item = itemsService.getItemById(params.id);
  if (!item) {
    set.status = 404;
    return { error: `Item with id '${params.id}' not found` };
  }
  return item.value;
};

export const createItem = ({
  body,
  set,
}: Context<CreateItemRouteContract>): CreateItemRouteContract["response"][201] => {
  const item = itemsService.createItem(body.value);
  set.status = 201;
  return item;
};

export const replaceItem = ({
  params,
  body,
  set,
}: Context<ReplaceItemRouteContract>): ReplaceItemRouteContract["response"][200 | 404] => {
  const item = itemsService.replaceItem(params.id, body.value);
  if (!item) {
    set.status = 404;
    return { error: `Item with id '${params.id}' not found` };
  }
  return item;
};

export const updateItem = ({
  params,
  body,
  set,
}: Context<UpdateItemRouteContract>): UpdateItemRouteContract["response"][200 | 404] => {
  const item = itemsService.updateItem(params.id, body.value);
  if (!item) {
    set.status = 404;
    return { error: `Item with id '${params.id}' not found` };
  }
  return item;
};

export const deleteItem = ({
  params,
  set,
}: Context<DeleteItemRouteContract>): DeleteItemRouteContract["response"][200 | 404] => {
  const deleted = itemsService.removeItem(params.id);
  if (!deleted) {
    set.status = 404;
    return { error: `Item with id '${params.id}' not found` };
  }
  return deleted;
};
