import { Elysia } from "elysia";
import { swagger } from "./swagger";
import { logger } from "./middlewares/logger";
import { errorHandler } from "./errorHandler";
import { healthRoutes } from "./routes/health.routes";
import { authRoutes } from "./routes/auth.routes";
import { meRoutes } from "./routes/me.routes";
import { secretRoutes } from "./routes/secret.routes";
import { usersRoutes } from "./routes/users.routes";

export const app = new Elysia()
  .use(swagger)
  .use(logger)
  .use(errorHandler)
  .use(healthRoutes)
  .use(authRoutes)
  .use(meRoutes)
  .use(secretRoutes)
  .use(usersRoutes);

export type App = typeof app;
