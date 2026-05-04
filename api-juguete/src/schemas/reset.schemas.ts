import { t, type Static } from "elysia";

/**
 * @description Tags for API documentation
 */
const tags = ["System"];

/**
 * @description Response schema for 204 OK
 */
export const resetSuccessResponseSchema = t.Void({
  description: "Database was wiped",
});

/**
 * @description Type for successful reset response
 */
export type ResetResponseSuccess = Static<typeof resetSuccessResponseSchema>;

/**
 * @description Schema for the reset route
 */
export const resetRouteSchema = {
  response: {
    204: resetSuccessResponseSchema,
  },
  detail: {
    tags,
    summary: "Reset",
    description: "Wipes the database. Requires a valid reset token as Bearer token.",
  },
};

/**
 * @description Interface representing the contract of the reset route
 */
export interface ResetRouteContract {
  response: {
    204: ResetResponseSuccess;
  };
}
