import { Elysia } from "elysia";
import { authenticator } from "../middlewares/authenticator";
import { obtenerPerfilRouteSchema } from "../schemas/users.schemas";
import * as meController from "../controllers/me.controller";

export const meRoutes = new Elysia()
  .use(authenticator)
  .get("/me", meController.obtenerPerfil, obtenerPerfilRouteSchema);
