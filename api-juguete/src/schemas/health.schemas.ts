import { t, type Static } from "elysia";

/**
 * @description Tags for API documentation
 */
const tags = ["System"];

/**
 * @description Response schema for 200 OK
 */
export const healthCheckSuccessResponseSchema = t.String({
  description: "API is healthy",
  example: "ok",
});

/**
 * @description Type for successful health check response
 */
export type HealthCheckResponseSuccess = Static<typeof healthCheckSuccessResponseSchema>;

/**
 * @description Schema for the health check route
 */
export const healthCheckRouteSchema = {
  response: {
    200: healthCheckSuccessResponseSchema,
  },
  detail: {
    tags,
    summary: "Health Check",
    description: "Returns the health status of the API.",
  },
};

/**
 * @description Interface representing the contract of the health check route
 */
export interface HealthCheckRouteContract {
  response: {
    200: HealthCheckResponseSuccess;
  };
}
