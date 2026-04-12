import { Elysia } from "elysia";
import { healthCheckRouteSchema } from "../schemas/health.schemas";

export const healthRoutes = new Elysia().get("/health", () => "ok", healthCheckRouteSchema);
