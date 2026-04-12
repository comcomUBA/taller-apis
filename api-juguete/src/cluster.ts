import cluster from "node:cluster";
import os from "node:os";
import process from "node:process";
import { log } from "./utils/logger";

if (cluster.isPrimary) {
  const cpus = os.availableParallelism();
  log.info(`Starting cluster with ${String(cpus)} workers...`);

  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    // Only restart and log if it was an unexpected crash, not a deliberate shutdown
    if (signal !== "SIGTERM" && signal !== "SIGINT" && !worker.exitedAfterDisconnect) {
      log.warn(`Worker died (${signal || String(code)}). Restarting...`);
      cluster.fork();
    }
  });

  const shutdown = (): void => {
    log.info("Cluster stopped successfully.");
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
} else {
  log.info(`Worker started successfully.`);
  await import("./server");
}
