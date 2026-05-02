import { t } from "elysia";
import type { Usuario } from "../repositories/users.repository";

/**
 * @description Tags para documentación de API
 */
const tags = ["Me"];

/*
  Schemas generales
*/

/**
 * @description Schema de usuario sin clave hasheada
 */

const usuarioSchema = t.Object({
  uuid: t.String({ description: "UUID del usuario" }),
  nombreDeUsuario: t.String({ description: "Nombre de usuario" }),
  claveHasheada: t.String({ description: "Clave hasheada del usuario" }),
});

/**
 * @description Schema de respuesta 401
 */
const unauthorizedResponseSchema = t.String({
  description: "No autorizado",
  examples: ["Unauthorized"],
});
/*
  GET /me
*/

/**
 * @description Schema de la ruta GET /me
 */

export const obtenerPerfilRouteSchema = {
  response: {
    200: usuarioSchema,
    401: unauthorizedResponseSchema,
  },
  detail: {
    tags,
    summary: "Obtener perfil",
    description: "Devuelve el perfil del usuario autenticado.",
    security: [{ BearerAuth: [] }],
  },
};

/**
 * @description Contrato de la ruta GET /me
 */
export interface ObtenerPerfilRouteContract {
  response: {
    200: Usuario;
    401: string;
  };
}