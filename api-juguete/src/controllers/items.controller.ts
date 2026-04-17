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

/*
export const getItemStatus = ({
  set,
}: Context<GetItemStatusContract>): GetItemStatusContract["response"][200 | 404] => {
  const item = itemsService.getRandomItem();
  if (!item) set.status = 404;
  return null;
};
*/

export const getRandomItem = ({
  set,
}: Context<GetRandomItemRouteContract>): GetRandomItemRouteContract["response"][200 | 404] => {
  try {
    const item = itemsService.getRandomItem();
    return item;
  } catch (error) {
    if (error instanceof itemsService.NotFoundError) {
      set.status = 404;
    } else {
      throw error;
    }

    return null;
  }
};

export const getItemById = ({
  params,
  set,
}: Context<GetItemByIdRouteContract>): GetItemByIdRouteContract["response"][200 | 404] => {
  try {
    const item = itemsService.getItemById(params.id);
    return item.value;
  } catch (error) {
    if (error instanceof itemsService.NotFoundError) {
      set.status = 404;
    } else {
      throw error;
    }

    return null;
  }
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
}: Context<ReplaceItemRouteContract>): ReplaceItemRouteContract["response"][204 | 404 | 409] => {
  try {
    itemsService.replaceItem(params.id, body.id, body.value);
    set.status = 204;
  } catch (error) {
    if (error instanceof itemsService.NotFoundError) {
      set.status = 404;
    } else if (error instanceof itemsService.ConflictError) {
      set.status = 409;
    } else if (error instanceof itemsService.EmptyIdError) {
      set.status = 400;
    } else {
      throw error;
    }
  }
  return null;
};

export const updateItem = ({
  params,
  body,
  set,
}: Context<UpdateItemRouteContract>): UpdateItemRouteContract["response"][204 | 404] => {
  try {
    itemsService.updateItem(params.id, body.value);
    set.status = 204;
  } catch (error) {
    if (error instanceof itemsService.NotFoundError) {
      set.status = 404;
    } else {
      throw error;
    }
  }
  return null;
};

export const deleteItem = ({
  params,
  set,
}: Context<DeleteItemRouteContract>): DeleteItemRouteContract["response"][204 | 404] => {
  try {
    itemsService.removeItem(params.id);
    set.status = 204;
  } catch (error) {
    if (error instanceof itemsService.NotFoundError) {
      set.status = 404;
    } else {
      throw error;
    }
  }
  return null;
};
