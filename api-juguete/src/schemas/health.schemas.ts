import { t, type Static } from "elysia";

const tags = ["System"]; // Category tags for API documentation

// Response schema for 200 OK
export const healthCheckSuccessResponseSchema = t.String({
  description: "API is healthy",
  example: "ok",
});
// Type for successful health check response
export type HealthCheckResponseSuccess = Static<typeof healthCheckSuccessResponseSchema>;

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
// Interface representing the contract of the health check route
export interface HealthCheckRouteContract {
  response: {
    200: HealthCheckResponseSuccess;
  };
}
