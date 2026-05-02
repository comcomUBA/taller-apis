import type { Item } from "../schemas/items.schemas";
import * as itemsRepository from "../repositories/items.repository";

/*
  Errors definitions
*/

/**
 * @description Error thrown when an item is not found
 */
export class NotFoundError extends Error {
  constructor(message = "Item not found") {
    super(message);
    this.name = "NotFoundError";
  }
}

/**
 * @description Error thrown when an item ID conflicts with an existing item
 */
export class ConflictError extends Error {
  constructor(message = "Item ID conflict") {
    super(message);
    this.name = "ConflictError";
  }
}

/**
 * @description Error thrown when an item ID cannot be empty
 */
export class EmptyIdError extends Error {
  constructor(message = "Item ID cannot be empty") {
    super(message);
    this.name = "EmptyIdError";
  }
}

/*
  Helper functions
*/

/**
 * @description Get a random item from the store, with retries for stale index entries
 * @param {number} attemptsLeft - The number of attempts left
 * @returns {Promise<Item>} A random item
 * @throws {NotFoundError} If no item is found
 */
const getRandomItemFromStore = async (attemptsLeft = 5): Promise<Item> => {
  const id = await itemsRepository.getRandomItemId();
  if (!id) throw new NotFoundError();

  const value = await itemsRepository.getItemValue(id);
  if (value !== null) {
    return { id, value };
  }

  // Stale index entry: remove it and retry
  await itemsRepository.removeItemFromIndex(id);

  if (attemptsLeft <= 1) throw new NotFoundError();
  return getRandomItemFromStore(attemptsLeft - 1);
};

/*
  Service methods
*/

/**
 * @description Get a random item from the store
 * @returns {Promise<Item>} A random item
 * @throws {NotFoundError} If no item is found
 */
export const getRandomItem = async (): Promise<Item> => {
  return getRandomItemFromStore();
};

/**
 * @description Get an item by its ID
 * @param {string} id - The ID of the item
 * @returns {Promise<Item>} The item with the specified ID
 * @throws {NotFoundError} If no item is found
 */
export const getItemById = async (id: string): Promise<Item> => {
  const value = await itemsRepository.getItemValue(id);

  if (value === null) throw new NotFoundError();

  return { id, value };
};

/**
 * @description Create a new item
 * @param {string} value - The value of the item
 * @returns {Promise<Item>} The created item
 */
export const createItem = async (value: string): Promise<Item> => {
  const id = await itemsRepository.saveItem(value);
  return { id, value };
};

/**
 * @description Replace an item with a new one
 * @param {string} id - The ID of the item to replace
 * @param {string} newId - The ID of the new item
 * @param {string} newValue - The value of the new item
 * @returns {Promise<Item>} The replaced item
 * @throws {NotFoundError} If no item is found
 * @throws {ConflictError} If the new item ID conflicts with an existing item
 */
export const replaceItem = async (id: string, newId: string, newValue: string): Promise<Item> => {
  const currentValue = await itemsRepository.getItemValue(id);

  if (currentValue === null) throw new NotFoundError();
  if (newId !== id && (await itemsRepository.itemExists(newId))) throw new ConflictError();

  if (newId === id) {
    await itemsRepository.updateItemValue(id, newValue);
    return { id, value: newValue };
  }

  await itemsRepository.replaceItem(id, newId, newValue);

  return { id: newId, value: newValue };
};

/**
 * @description Update an item
 * @param {string} id - The ID of the item to update
 * @param {string} value - The new value of the item
 * @returns {Promise<Item>} The updated item
 * @throws {NotFoundError} If no item is found
 */
export const updateItem = async (id: string, value?: string): Promise<Item> => {
  const currentValue = await itemsRepository.getItemValue(id);

  if (currentValue === null) throw new NotFoundError();
  if (value !== undefined) {
    await itemsRepository.updateItemValue(id, value);
    return { id, value };
  }

  return { id, value: currentValue };
};

/**
 * @description Remove an item
 * @param {string} id - The ID of the item to remove
 * @returns {Promise<Item>} The removed item
 * @throws {NotFoundError} If no item is found
 */
export const removeItem = async (id: string): Promise<Item> => {
  const value = await itemsRepository.getItemValue(id);

  if (value === null) throw new NotFoundError();

  await itemsRepository.deleteItem(id);

  return { id, value };
};
