import { Elysia } from "elysia";
import { log } from "./utils/logger";

export const errorHandler = new Elysia({ name: "plugin.error" })
  .onError(({ error, set, code, request }) => {
    if (code === "NOT_FOUND") {
      set.status = 404;
      log.warn(`Not found: ${new URL(request.url).pathname}`);
      return "Not found";
    }
    if (code === "VALIDATION") {
      set.status = 400;
      log.error(error.messageValue);
      return "Invalid request";
    }
    set.status = 500;
    log.error(error);
    return "Internal server error";
  })
  .as("global");
