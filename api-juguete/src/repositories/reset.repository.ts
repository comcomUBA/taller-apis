import { getRedis } from "../databases/redis";

/**
 * @description Flush the entire database
 */
export const flushDatabase = async (): Promise<void> => {
  const client = await getRedis();
  await client.flushDb();
};
