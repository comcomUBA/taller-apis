import { Elysia } from "elysia";
import { authenticator } from "../middlewares/authenticator";
import { resetRouteSchema } from "../schemas/reset.schemas";
import * as resetController from "../controllers/reset.controller";

export const resetRoutes = new Elysia()
  .use(authenticator)
  .post("/reset", resetController.reset, resetRouteSchema);
