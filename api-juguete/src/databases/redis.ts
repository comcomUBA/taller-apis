import { createClient } from "redis";

const redisUrl = Bun.env.REDIS_URL ?? "redis://api-juguete-dragonfly:6379";

const redis = createClient({
  url: redisUrl,
});

type RedisStore = typeof redis;

let redisConnection: Promise<RedisStore> | null = null;

redis.on("error", (error) => {
  console.error("Redis client error:", error);
});

/**
 * @description Get the Redis client
 * @returns {Promise<RedisStore>} The Redis client
 */
export const getRedis = async (): Promise<RedisStore> => {
  if (!redis.isOpen) {
    redisConnection ??= redis.connect().finally(() => {
      redisConnection = null;
    });
    await redisConnection;
  }

  return redis;
};

/**
 * @description Close the connection to the Redis server
 * @returns {Promise<void>}
 */
export const closeRedis = async (): Promise<void> => {
  if (redis.isOpen) {
    await redis.quit();
  }
};
