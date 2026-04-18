import { Elysia } from "elysia";
import { listarUsuariosRouteSchema } from "../schemas/users.schemas";
import * as usersController from "../controllers/users.controller";

export const usersRoutes = new Elysia()
  /**
   * Ejercicio: proteger la ruta con autenticación
   */
  .get("/users", usersController.listarUsuarios, listarUsuariosRouteSchema);
