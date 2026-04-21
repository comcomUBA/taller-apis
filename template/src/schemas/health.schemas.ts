import { t } from "elysia";

/**
 * @description Tags para documentación de API
 */
const tags = ["Sistema"];

/*
  Schemas generales
*/

/**
 * @description Schema de respuesta 200 OK
 */
export const healthCheckSuccessResponseSchema = t.String({
  description: "API saludable",
  example: "ok",
});

/*
  GET /health
*/

/**
 * @description Schema para la ruta health check
 */
export const healthCheckRouteSchema = {
  response: {
    200: healthCheckSuccessResponseSchema,
  },
  detail: {
    tags,
    summary: "Chequeo de salud",
    description: "Devuelve el estado de salud de la API.",
  },
};

