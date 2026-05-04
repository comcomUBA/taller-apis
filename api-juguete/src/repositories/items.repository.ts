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
  Repository methods
*/

/**
 * @description Get a random item ID from the set
 * @returns {Promise<string | null>} A random item ID, or null if the set is empty
 */
export const getRandomItemId = async (): Promise<string | null> => {
  const client = await getRedis();
  return client.sRandMember(itemsKey);
};

/**
 * @description Get the value of an item by its ID
 * @param {string} id - The ID of the item
 * @returns {Promise<string | null>} The value of the item, or null if it doesn't exist
 */
export const getItemValue = async (id: string): Promise<string | null> => {
  const client = await getRedis();
  return client.get(itemKey(id));
};

/**
 * @description Save an item (set its value and add its ID to the index)
 * @param {string} value - The value of the item
 * @returns {Promise<string>} The ID of the saved item
 */
export const saveItem = async (value: string): Promise<string> => {
  const client = await getRedis();
  const id = crypto.randomUUID();
  await client.set(itemKey(id), value);
  await client.sAdd(itemsKey, id);
  return id;
};

/**
 * @description Remove an item ID from the index (without deleting the item key)
 * @param {string} id - The ID of the item
 */
export const removeItemFromIndex = async (id: string): Promise<void> => {
  const client = await getRedis();
  await client.sRem(itemsKey, id);
};

/**
 * @description Delete an item completely (key + index)
 * @param {string} id - The ID of the item
 */
export const deleteItem = async (id: string): Promise<void> => {
  const client = await getRedis();
  const transaction = client.multi();
  transaction.del(itemKey(id));
  transaction.sRem(itemsKey, id);
  await transaction.exec();
};

/**
 * @description Check if an item exists
 * @param {string} id - The ID of the item
 * @returns {Promise<boolean>} True if the item exists
 */
export const itemExists = async (id: string): Promise<boolean> => {
  const client = await getRedis();
  return (await client.exists(itemKey(id))) > 0;
};

/**
 * @description Update the value of an existing item (without modifying the index)
 * @param {string} id - The ID of the item
 * @param {string} value - The new value
 */
export const updateItemValue = async (id: string, value: string): Promise<void> => {
  const client = await getRedis();
  await client.set(itemKey(id), value);
};

/**
 * @description Replace an item with a new ID and value (transactional)
 * @param {string} oldId - The ID of the item to replace
 * @param {string} newId - The new ID
 * @param {string} newValue - The new value
 */
export const replaceItem = async (
  oldId: string,
  newId: string,
  newValue: string,
): Promise<void> => {
  const client = await getRedis();
  const transaction = client.multi();
  transaction.del(itemKey(oldId));
  transaction.set(itemKey(newId), newValue);
  transaction.sRem(itemsKey, oldId);
  transaction.sAdd(itemsKey, newId);
  await transaction.exec();
};
