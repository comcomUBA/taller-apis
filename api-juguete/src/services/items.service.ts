import type { Item, ItemBody } from "../schemas/items.schemas";

const items: Record<string, ItemBody> = {};

function generateId(): string {
  return crypto.randomUUID();
}

export function getRandomItem(): Item | undefined {
  const keys = Object.keys(items);
  if (keys.length === 0) return undefined;
  const index = Math.floor(Math.random() * keys.length);
  const key = keys[index];
  if (!key || !items[key]) return undefined;
  return { id: key, value: items[key].value };
}

export function getItemById(id: string): Item | undefined {
  const item = items[id];
  if (!item) return undefined;
  return { id, value: item.value };
}

export function createItem(value: string): Item {
  const id = generateId();
  const item: ItemBody = { value };
  items[id] = item;
  return { id, value };
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

export function replaceItem(id: string, newId: string, newValue: string): Item {
  const item = items[id];
  if (!item) throw new NotFoundError();
  if (newId !== id && items[newId]) throw new ConflictError();
  if (newId !== id) delete items[id];
  item.value = newValue;
  items[newId] = item;
  return { id: newId, value: item.value };
}

export function updateItem(id: string, value?: string): Item | undefined {
  const item = items[id];
  if (!item) return undefined;
  if (value) item.value = value;
  return { id, value: item.value };
}

export function removeItem(id: string): Item | undefined {
  const item = items[id];
  if (!item) return undefined;
  delete items[id];
  return { id, value: item.value };
}
