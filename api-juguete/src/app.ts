import { Elysia } from "elysia";
import { swagger } from "./swagger";
import { logger } from "./middlewares/logger";
import { errorHandler } from "./errorHandler";
import { healthRoutes } from "./routes/health.routes";
import { itemsRoutes } from "./routes/items.routes";

export const app = new Elysia()
  .use(swagger)
  .use(logger)
  .use(errorHandler)
  .use(healthRoutes)
  .use(itemsRoutes);

export type App = typeof app;
