import { t, type Static } from "elysia";

/**
 * @description Tags para documentación de API
 */
const tags = ["Sistema"];

/**
 * @description Schema de respuesta 200 OK
 */
export const healthCheckSuccessResponseSchema = t.String({
  description: "API saludable",
  example: "ok",
});

/**
 * @description Tipo de respuesta exitosa
 */
export type HealthCheckResponseSuccess = Static<typeof healthCheckSuccessResponseSchema>;

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

/**
 * @description Contrato de la ruta health check
 */
export interface HealthCheckRouteContract {
  response: {
    200: HealthCheckResponseSuccess;
  };
}
