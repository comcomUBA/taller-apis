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

/**
 * @description Get a random item from the store
 * @param {Context<GetRandomItemRouteContract>} set - The context for setting the response status
 * @returns {Promise<GetRandomItemRouteContract["response"][200 | 404]>} The random item if there is at least one item in the store, otherwise null
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

/**
 * @description Get an item by its ID
 * @param {Context<GetItemByIdRouteContract>} params - The query parameters
 * @param {Context<GetItemByIdRouteContract>} set - The context for setting the response status
 * @returns {Promise<GetItemByIdRouteContract["response"][200 | 404]>} The value of the item if found, otherwise null
 */
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

/**
 * @description Create a new item
 * @param {Context<CreateItemRouteContract>} body - The body
 * @param {Context<CreateItemRouteContract>} set - The context for setting the response status
 * @returns {Promise<CreateItemRouteContract["response"][201]>} The created item
 */
export const createItem = async ({
  body,
  set,
}: Context<CreateItemRouteContract>): Promise<CreateItemRouteContract["response"][201]> => {
  const item = await itemsService.createItem(body.value);
  set.status = 201;
  return item;
};

/**
 * @description Replace an item
 * @param {Context<ReplaceItemRouteContract>} params - The query parameters
 * @param {Context<ReplaceItemRouteContract>} body - The request body
 * @param {Context<ReplaceItemRouteContract>} set - The context for setting the response status
 * @returns {Promise<ReplaceItemRouteContract["response"][204 | 404 | 409]>} null
 */
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

/**
 * @description Update an item
 * @param {Context<UpdateItemRouteContract>} params - The query parameters
 * @param {Context<UpdateItemRouteContract>} body - The request body
 * @param {Context<UpdateItemRouteContract>} set - The context for setting the response status
 * @returns {Promise<UpdateItemRouteContract["response"][204 | 404]>} null
 */
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

/**
 * @description Delete an item
 * @param {Context<DeleteItemRouteContract>} params - The query parameters
 * @param {Context<DeleteItemRouteContract>} set - The context for setting the response status
 * @returns {Promise<DeleteItemRouteContract["response"][204 | 404]>} null
 */
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
