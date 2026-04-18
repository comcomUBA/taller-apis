import { Elysia } from "elysia";
import { obtenerSecretoRouteSchema } from "../schemas/secret.schemas";
import * as secretController from "../controllers/secret.controller";

export const secretRoutes = new Elysia()
  /**
   * Ejercicio: proteger la ruta con autenticación
   */
  .get("/secret", secretController.obtenerSecreto, obtenerSecretoRouteSchema);
