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

  // Listen for reset messages from workers
  const handleWorkerMessage = (message: { type?: string }): void => {
    if (message.type === "reset") {
      log.info("Reset requested, restarting all workers...");
      for (const worker of Object.values(cluster.workers ?? {})) {
        if (worker) {
          worker.disconnect();
          setTimeout(() => {
            if (!worker.isDead()) worker.kill("SIGKILL");
          }, 5000).unref();
        }
      }
      // Fork fresh workers after a short delay to let old ones drain
      setTimeout(() => {
        const targetWorkers = os.availableParallelism();
        const currentWorkers = Object.keys(cluster.workers ?? {}).length;
        for (let i = currentWorkers; i < targetWorkers; i++) {
          const w = cluster.fork();
          w.on("message", handleWorkerMessage);
        }
      }, 1000).unref();
    }
  };

  cluster.on("fork", (worker) => {
    worker.on("message", handleWorkerMessage);
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
