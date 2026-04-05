import { swagger as elysiaSwagger } from "@elysiajs/swagger";
import pkg from "../package.json" with { type: "json" };

export const swagger = elysiaSwagger({
  path: "/docs",
  provider: "scalar",
  scalarConfig: {
    theme: "deepSpace",
  },
  documentation: {
    info: {
      title: "API Documentation",
      version: pkg.version,
    },
    servers: [
      {
        url: Bun.env.BACKEND_URL!,
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
});
