import { t, type Static } from "elysia";

/**
 * @description Tags para documentación de API
 */
const tags = ["Usuarios"];

/*
  Schemas compartidos
*/

/**
 * @description Schema de usuario sin clave hasheada
 */

const usuarioSinClaveSchema = t.Object({
  uuid: t.String({ description: "UUID del usuario" }),
  nombreDeUsuario: t.String({ description: "Nombre de usuario" }),
});

/**
 * @description Tipo de usuario sin clave hasheada
 */
export type UsuarioSinClave = Static<typeof usuarioSinClaveSchema>;

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
    200: usuarioSinClaveSchema,
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
    200: UsuarioSinClave;
    401: string;
  };
}

/*
  GET /users
*/

/**
 * @description Schema de la ruta GET /users
 */

export const listarUsuariosRouteSchema = {
  response: {
    200: t.Array(usuarioSinClaveSchema, {
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
    200: UsuarioSinClave[];
    401: string;
  };
}
