import { Elysia } from "elysia";
import { swagger } from "./swagger";
import { logger } from "./middlewares/logger";
import { errorHandler } from "./errorHandler";
import { healthRoutes } from "./routes/health.routes";
import { itemsRoutes } from "./routes/items.routes";
import { resetRoutes } from "./routes/reset.routes";

export const app = new Elysia()
  .use(swagger)
  .use(logger)
  .use(errorHandler)
  .use(healthRoutes)
  .use(itemsRoutes)
  .use(resetRoutes);

export type App = typeof app;
