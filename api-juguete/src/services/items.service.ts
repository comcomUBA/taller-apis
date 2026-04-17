import type { Item } from "../schemas/items.schemas";
import { getRedis } from "../databases/redis";

/*
  Constants
*/

/**
 * @description Key for the set of item IDs
 */
const itemsKey = "items:ids";

/**
 * @description Key for a specific item
 * @param {string} id - The ID of the item
 * @returns {string} The key for the item
 */
const itemKey = (id: string): string => `items:${id}`;

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
 * @description Get a random item from the store
 * @param {Awaited<ReturnType<typeof getRedis>>} client - The Redis client
 * @param {number} attemptsLeft - The number of attempts left
 * @returns {Promise<Item>} A random item
 * @throws {NotFoundError} If no item is found
 */
async function getRandomItemFromStore(
  client: Awaited<ReturnType<typeof getRedis>>,
  attemptsLeft = 5,
): Promise<Item> {
  const id = await client.sRandMember(itemsKey);
  if (!id) throw new NotFoundError();

  const value = await client.get(itemKey(id));
  if (value !== null) {
    return { id, value };
  }

  await client.sRem(itemsKey, id);

  if (attemptsLeft <= 1) throw new NotFoundError();
  return getRandomItemFromStore(client, attemptsLeft - 1);
}

/**
 * @description Generate a random UUID
 * @returns {string} A random UUID
 */
function generateId(): string {
  return crypto.randomUUID();
}

/*
  Service methods
*/

/**
 * @description Get a random item from the store
 * @returns {Promise<Item>} A random item
 * @throws {NotFoundError} If no item is found
 */
export async function getRandomItem(): Promise<Item> {
  const client = await getRedis();
  return getRandomItemFromStore(client);
}

/**
 * @description Get an item by its ID
 * @param {string} id - The ID of the item
 * @returns {Promise<Item>} The item with the specified ID
 * @throws {NotFoundError} If no item is found
 */
export async function getItemById(id: string): Promise<Item> {
  const client = await getRedis();
  const value = await client.get(itemKey(id));

  if (value === null) throw new NotFoundError();

  return { id, value };
}

/**
 * @description Create a new item
 * @param {string} value - The value of the item
 * @returns {Promise<Item>} The created item
 */
export async function createItem(value: string): Promise<Item> {
  const client = await getRedis();
  const id = generateId();
  await client.set(itemKey(id), value);
  await client.sAdd(itemsKey, id);
  return { id, value };
}

/**
 * @description Replace an item with a new one
 * @param {string} id - The ID of the item to replace
 * @param {string} newId - The ID of the new item
 * @param {string} newValue - The value of the new item
 * @returns {Promise<Item>} The replaced item
 * @throws {NotFoundError} If no item is found
 * @throws {ConflictError} If the new item ID conflicts with an existing item
 */
export async function replaceItem(id: string, newId: string, newValue: string): Promise<Item> {
  const client = await getRedis();
  const currentValue = await client.get(itemKey(id));

  if (currentValue === null) throw new NotFoundError();
  if (newId !== id && (await client.exists(itemKey(newId))) > 0) throw new ConflictError();

  if (newId === id) {
    await client.set(itemKey(id), newValue);
    return { id, value: newValue };
  }

  const transaction = client.multi();
  transaction.del(itemKey(id));
  transaction.set(itemKey(newId), newValue);
  transaction.sRem(itemsKey, id);
  transaction.sAdd(itemsKey, newId);
  await transaction.exec();

  return { id: newId, value: newValue };
}

/**
 * @description Update an item
 * @param {string} id - The ID of the item to update
 * @param {string} value - The new value of the item
 * @returns {Promise<Item>} The updated item
 * @throws {NotFoundError} If no item is found
 */
export async function updateItem(id: string, value?: string): Promise<Item> {
  const client = await getRedis();
  const currentValue = await client.get(itemKey(id));

  if (currentValue === null) throw new NotFoundError();
  if (value !== undefined) {
    await client.set(itemKey(id), value);
    return { id, value };
  }

  return { id, value: currentValue };
}

/**
 * @description Remove an item
 * @param {string} id - The ID of the item to remove
 * @returns {Promise<Item>} The removed item
 * @throws {NotFoundError} If no item is found
 */
export async function removeItem(id: string): Promise<Item> {
  const client = await getRedis();
  const value = await client.get(itemKey(id));

  if (value === null) throw new NotFoundError();

  const transaction = client.multi();
  transaction.del(itemKey(id));
  transaction.sRem(itemsKey, id);
  await transaction.exec();

  return { id, value };
}
