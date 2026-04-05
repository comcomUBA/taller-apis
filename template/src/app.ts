import { Elysia } from "elysia";
import { cors } from "./cors";
import { swagger } from "./swagger";
import { logger } from "./middlewares/logger";
import { errorHandler } from "./errorHandler";
import { healthRoutes } from "./routes/health.routes";

export const app = new Elysia()
  .use(cors)
  .use(swagger)
  .use(logger)
  .use(errorHandler)
  .use(healthRoutes);

export type App = typeof app;
