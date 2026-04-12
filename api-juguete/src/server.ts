import cluster from "node:cluster";
import { app } from "./app";
import { log } from "./utils/logger";

app.listen(parseInt(Bun.env.PORT!), () => {
  if (cluster.isPrimary) {
    log.info(`Server started successfully. API documentation: ${Bun.env.BACKEND_URL!}/docs`);
  }
});

const shutdown = async (): Promise<void> => {
  await app.stop();
  if (cluster.isPrimary) {
    log.info("Server stopped successfully.");
  } else {
    log.info(`Worker stopped successfully.`);
  }
  process.exit(0);
};

process.on("SIGTERM", () => {
  void shutdown();
});
process.on("SIGINT", () => {
  void shutdown();
});
