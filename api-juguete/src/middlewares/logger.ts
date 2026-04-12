import { Elysia } from "elysia";
import { log } from "../utils/logger";

// oxlint-disable-next-line typescript/explicit-function-return-type
export const logger = (app: Elysia) =>
  app
    .derive(() => {
      return {
        start: Date.now(),
      };
    })
    .onAfterHandle(({ request, set, start }) => {
      const end = Date.now();
      const duration = end - start;
      const method = request.method;
      const url = new URL(request.url).pathname;

      let status = typeof set.status === "number" ? set.status : 200;
      if (typeof set.status === "string") {
        status = parseInt(set.status, 10);
        if (isNaN(status)) status = 200;
      }

      log.info({
        method,
        url,
        status,
        duration,
      });
    });
