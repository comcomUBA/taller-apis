import { t, type Static } from "elysia";

const tags = ["System"]; // Category tags for API documentation

/*
  Health check route schema (GET /health)
*/

// Response schema for 200 OK
export const healthCheckSuccessResponseSchema = t.String({
  description: "API is healthy",
  example: "ok",
});

// Schema itself for the health check route
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

/*
  TypeScript types for health check route
*/

// Type for successful health check response
export type HealthCheckResponseSuccess = Static<typeof healthCheckSuccessResponseSchema>;

// Interface representing the contract of the health check route
export interface HealthCheckRouteContract {
  response: {
    200: HealthCheckResponseSuccess;
  };
}
