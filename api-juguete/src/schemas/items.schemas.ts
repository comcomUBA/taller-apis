import { t, type Static } from "elysia";

/**
 * @description Tags for API documentation
 */
const tags = ["Items"];

/**
 * @description Schema for item ID
 */
const idSchema = t.String({
  description: "Item ID (no spaces, at least 1 character)",
  pattern: "^\\S+$",
  minLength: 1,
});

/**
 * @description Schema for an item
 */
export const itemSchema = t.Object({
  id: idSchema,
  value: t.String({ description: "String value stored in the item" }),
});

/**
 * @description Type for an item
 */
export type Item = Static<typeof itemSchema>;

/**
 * @description Schema for item ID parameter
 */
const itemIdParamSchema = t.Object({
  id: idSchema,
});

/**
 * @description Type for item ID parameter
 */
export type ItemIdParams = Static<typeof itemIdParamSchema>;

/**
 * @description Schema for item body
 */
const itemBodySchema = t.Object({
  value: t.String({
    description: "String value to store",
    examples: ["ComCom"],
  }),
});

/**
 * @description Type for item body
 */
export type ItemBody = Static<typeof itemBodySchema>;

/**
 * @description Schema for update item body
 */
const updateItemBodySchema = t.Object({
  value: t.Optional(
    t.String({
      description: "New string value",
      examples: ["updated value"],
    }),
  ),
});

/**
 * @description Type for update item body
 */
export type UpdateItemBody = Static<typeof updateItemBodySchema>;

/**
 * @description Schema for not found response
 */
const notFoundResponseSchema = t.Null({ description: "Not found" });

/**
 * @description Type for not found response
 */
export type NotFoundResponse = Static<typeof notFoundResponseSchema>;

/**
 * @description Schema for bad request response
 */
const badRequestResponseSchema = t.String({
  description: "Bad request",
  examples: ["Invalid request"],
});

/**
 * @description Type for bad request response
 */
export type BadRequestResponse = Static<typeof badRequestResponseSchema>;

/**
 * @description Schema for no content response
 */
const noContentResponseSchema = t.Null({ description: "No content" });

/**
 * @description Type for no content response
 */
export type NoContentResponse = Static<typeof noContentResponseSchema>;

/**
 * @description Schema for conflict response
 */
const conflictResponseSchema = t.Null({ description: "Conflict" });

/**
 * @description Type for conflict response
 */
export type ConflictResponse = Static<typeof conflictResponseSchema>;

/**
 * @description Schema for GET /items route
 */
export const getRandomItemRouteSchema = {
  response: {
    200: itemSchema,
    404: notFoundResponseSchema,
  },
  detail: {
    tags,
    summary: "Get Random Item",
    description: "Returns a random item from the list.",
  },
};

/**
 * @description Interface representing the contract of the get random item route
 */
export interface GetRandomItemRouteContract {
  response: {
    200: Item;
    404: NotFoundResponse;
  };
}

/**
 * @description Schema for GET /items/{id} route
 */
export const getItemByIdRouteSchema = {
  params: itemIdParamSchema,
  response: {
    200: t.String({ description: "The string value of the item" }),
    404: notFoundResponseSchema,
  },
  detail: {
    tags,
    summary: "Get Item by ID",
    description: "Returns the string value of the item with the given ID.",
  },
};

/**
 * @description Interface representing the contract of the get item by ID route
 */
export interface GetItemByIdRouteContract {
  params: ItemIdParams;
  response: {
    200: string;
    404: NotFoundResponse;
  };
}

/**
 * @description Schema for POST /items route
 */
export const createItemRouteSchema = {
  body: itemBodySchema,
  response: {
    201: itemSchema,
  },
  detail: {
    tags,
    summary: "Create Item",
    description: "Adds a new item with a random ID and the provided string value.",
  },
};

/**
 * @description Interface representing the contract of the create item route
 */
export interface CreateItemRouteContract {
  body: ItemBody;
  response: {
    201: Item;
  };
}

/**
 * @description Schema for PUT /items/{id} route
 */
export const replaceItemRouteSchema = {
  params: itemIdParamSchema,
  body: itemSchema,
  response: {
    204: noContentResponseSchema,
    400: badRequestResponseSchema,
    404: notFoundResponseSchema,
    409: conflictResponseSchema,
  },
  detail: {
    tags,
    summary: "Replace Item",
    description: "Replaces the string value of an existing item entirely.",
  },
};

/**
 * @description Interface representing the contract of the replace item route
 */
export interface ReplaceItemRouteContract {
  params: ItemIdParams;
  body: Item;
  response: {
    204: NoContentResponse;
    400: BadRequestResponse;
    404: NotFoundResponse;
    409: ConflictResponse;
  };
}

/**
 * @description Schema for PATCH /items/{id} route
 */
export const updateItemRouteSchema = {
  params: itemIdParamSchema,
  body: updateItemBodySchema,
  response: {
    204: noContentResponseSchema,
    404: notFoundResponseSchema,
  },
  detail: {
    tags,
    summary: "Update Item",
    description: "Partially updates an existing item.",
  },
};

/**
 * @description Interface representing the contract of the update item route
 */
export interface UpdateItemRouteContract {
  params: ItemIdParams;
  body: UpdateItemBody;
  response: {
    204: NoContentResponse;
    404: NotFoundResponse;
  };
}

/**
 * @description Schema for DELETE /items/{id} route
 */
export const deleteItemRouteSchema = {
  params: itemIdParamSchema,
  response: {
    204: noContentResponseSchema,
    404: notFoundResponseSchema,
  },
  detail: {
    tags,
    summary: "Delete Item",
    description: "Deletes the item with the given ID from the list.",
  },
};

/**
 * @description Interface representing the contract of the delete item route
 */
export interface DeleteItemRouteContract {
  params: ItemIdParams;
  response: {
    204: NoContentResponse;
    404: NotFoundResponse;
  };
}
