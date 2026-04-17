import { createClient } from "redis";

const redisUrl = Bun.env.REDIS_URL ?? "redis://localhost:6379";

const redis = createClient({
  url: redisUrl,
});

type RedisStore = typeof redis;

let redisConnection: Promise<RedisStore> | null = null;

redis.on("error", (error) => {
  console.error("Redis client error:", error);
});

export async function getRedis(): Promise<RedisStore> {
  if (!redis.isOpen) {
    redisConnection ??= redis.connect().finally(() => {
      redisConnection = null;
    });
    await redisConnection;
  }

  return redis;
}

export async function closeRedis(): Promise<void> {
  if (redis.isOpen) {
    await redis.quit();
  }
}
