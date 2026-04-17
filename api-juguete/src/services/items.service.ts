import type { Item } from "../schemas/items.schemas";
import { getRedis } from "../databases/redis";

const itemsKey = "items:ids";
const itemKey = (id: string): string => `items:${id}`;

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

function generateId(): string {
  return crypto.randomUUID();
}

export class NotFoundError extends Error {
  constructor(message = "Item not found") {
    super(message);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends Error {
  constructor(message = "Item ID conflict") {
    super(message);
    this.name = "ConflictError";
  }
}

export class EmptyIdError extends Error {
  constructor(message = "Item ID cannot be empty") {
    super(message);
    this.name = "EmptyIdError";
  }
}

export async function getRandomItem(): Promise<Item> {
  const client = await getRedis();
  return getRandomItemFromStore(client);
}

export async function getItemById(id: string): Promise<Item> {
  const client = await getRedis();
  const value = await client.get(itemKey(id));

  if (value === null) throw new NotFoundError();

  return { id, value };
}

export async function createItem(value: string): Promise<Item> {
  const client = await getRedis();
  const id = generateId();
  await client.set(itemKey(id), value);
  await client.sAdd(itemsKey, id);
  return { id, value };
}

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
