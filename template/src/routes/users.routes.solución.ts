import { Elysia } from "elysia";
import { listarUsuariosRouteSchema } from "../schemas/users.schemas";
import * as usersController from "../controllers/users.controller";
import { authenticator } from "../middlewares/authenticator";

export const usersRoutes = new Elysia()
  /**
   * Ejercicio: proteger la ruta con autenticación
   */
  .use(authenticator)
  .get("/users", usersController.listarUsuarios, listarUsuariosRouteSchema);
