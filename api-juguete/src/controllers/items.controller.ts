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

export const getRandomItem = async ({
  set,
}: Context<GetRandomItemRouteContract>): Promise<
  GetRandomItemRouteContract["response"][200 | 404]
> => {
  try {
    const item = await itemsService.getRandomItem();
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

export const getItemById = async ({
  params,
  set,
}: Context<GetItemByIdRouteContract>): Promise<GetItemByIdRouteContract["response"][200 | 404]> => {
  try {
    const item = await itemsService.getItemById(params.id);
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

export const createItem = async ({
  body,
  set,
}: Context<CreateItemRouteContract>): Promise<CreateItemRouteContract["response"][201]> => {
  const item = await itemsService.createItem(body.value);
  set.status = 201;
  return item;
};

export const replaceItem = async ({
  params,
  body,
  set,
}: Context<ReplaceItemRouteContract>): Promise<
  ReplaceItemRouteContract["response"][204 | 404 | 409]
> => {
  try {
    await itemsService.replaceItem(params.id, body.id, body.value);
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

export const updateItem = async ({
  params,
  body,
  set,
}: Context<UpdateItemRouteContract>): Promise<UpdateItemRouteContract["response"][204 | 404]> => {
  try {
    await itemsService.updateItem(params.id, body.value);
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

export const deleteItem = async ({
  params,
  set,
}: Context<DeleteItemRouteContract>): Promise<DeleteItemRouteContract["response"][204 | 404]> => {
  try {
    await itemsService.removeItem(params.id);
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
