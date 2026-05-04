import * as resetRepository from "../repositories/reset.repository";

/**
 * @description Reset the database and request worker restart
 */
export const reset = async (): Promise<void> => {
  await resetRepository.flushDatabase();

  // Ask the cluster primary to restart all workers via IPC
  /*
  if (process.send) {
    process.send({ type: "reset" });
    log.info("Reset signal sent to cluster primary");
  }
  */
};
