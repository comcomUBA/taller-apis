import type { Context } from "elysia";
import type { ResetRouteContract } from "../schemas/reset.schemas";
import * as resetService from "../services/reset.service";

/**
 * @description Reset the database and restart workers
 * @param {Context<ResetRouteContract>} context - The route context
 * @returns {Promise<ResetRouteContract["response"][204]>} Result message
 */
export const reset = async ({
  set,
}: Context<ResetRouteContract>): Promise<ResetRouteContract["response"][204]> => {
  await resetService.reset();
  set.status = 204;
};
