import type { Item } from "../schemas/items.schemas";

const items: Item[] = [];

function generateId(): string {
  return crypto.randomUUID();
}

export function getRandomItem(): Item | undefined {
  if (items.length === 0) return undefined;
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

export function getItemById(id: string): Item | undefined {
  return items.find((item) => item.id === id);
}

export function createItem(value: string): Item {
  const item: Item = { id: generateId(), value };
  items.push(item);
  return item;
}

export function replaceItem(id: string, value: string): Item | undefined {
  const item = items.find((el) => el.id === id);
  if (!item) return undefined;
  item.value = value;
  return item;
}

export function updateItem(id: string, value?: string): Item | undefined {
  const item = items.find((el) => el.id === id);
  if (!item) return undefined;
  if (value !== undefined) {
    item.value = value;
  }
  return item;
}

export function removeItem(id: string): Item | undefined {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return undefined;
  const [deleted] = items.splice(index, 1);
  return deleted;
}
