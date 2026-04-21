import pino from "pino";

/**
 * @description Logger
 */
export const log = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});
