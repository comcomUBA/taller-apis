import { t } from "elysia";

/**
 * @description Tags para documentación de API
 */
const tags = ["Secreto"];

/*
  Schemas generales
*/

/**
 * @description Schema de respuesta 401
 */
const unauthorizedResponseSchema = t.String({
  description: "No autorizado",
  examples: ["Unauthorized"],
});

/*
  GET /secret
*/

/**
 * @description Schema de la ruta GET /secret
 */

export const obtenerSecretoRouteSchema = {
  response: {
    302: t.Void({ description: "Redirige al recurso secreto" }),
    401: unauthorizedResponseSchema,
  },
  detail: {
    tags,
    summary: "Recurso secreto",
    description: "Redirige al recurso secreto. Requiere autenticación.",
    security: [{ BearerAuth: [] }],
  },
};

/**
 * @description Contrato de la ruta GET /secret
 */
export interface ObtenerSecretoRouteContract {
  response: {
    302: void;
    401: string;
  };
}