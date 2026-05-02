import { t } from "elysia";
import type { UsuarioSinClaveHasheada } from "../repositories/users.repository";

/**
 * @description Tags para documentación de API
 */
const tags = ["Usuarios"];

/*
  Schemas generales
*/

/**
 * @description Schema de usuario sin clave hasheada
 */

const usuarioSinClaveHasheadaSchema = t.Object({
  uuid: t.String({ description: "UUID del usuario" }),
  nombreDeUsuario: t.String({ description: "Nombre de usuario" }),
});

/**
 * @description Schema de respuesta 401
 */
const unauthorizedResponseSchema = t.String({
  description: "No autorizado",
  examples: ["Unauthorized"],
});

/*
  GET /users
*/

/**
 * @description Schema de la ruta GET /users
 */

export const listarUsuariosRouteSchema = {
  response: {
    200: t.Array(usuarioSinClaveHasheadaSchema, {
      description: "Lista de usuarios registrados",
    }),
    401: unauthorizedResponseSchema,
  },
  detail: {
    tags,
    summary: "Listar usuarios",
    description: "Devuelve la lista de todos los usuarios registrados (sin claves).",
    security: [{ BearerAuth: [] }],
  },
};

/**
 * @description Contrato de la ruta GET /users
 */
export interface ListarUsuariosRouteContract {
  response: {
    200: UsuarioSinClaveHasheada[];
    401: string;
  };
}
