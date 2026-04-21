import { Elysia } from "elysia";
import { obtenerSecretoRouteSchema } from "../schemas/secret.schemas";
import * as secretController from "../controllers/secret.controller";
import { authenticator } from "../middlewares/authenticator";

export const secretRoutes = new Elysia()
  /**
   * Ejercicio: proteger la ruta con autenticación
   */
  .use(authenticator)
  .get("/secret", secretController.obtenerSecreto, obtenerSecretoRouteSchema);
