import { t, type Static } from "elysia";

const tags = ["Items"]; // Category tags for API documentation

const idSchema = t.String({
  description: "Item ID (no spaces, at least 1 character)",
  pattern: "^\\S+$",
  minLength: 1,
});

export const itemSchema = t.Object({
  id: idSchema,
  value: t.String({ description: "String value stored in the item" }),
});
export type Item = Static<typeof itemSchema>;

const itemIdParamSchema = t.Object({
  id: idSchema,
});
export type ItemIdParams = Static<typeof itemIdParamSchema>;

const itemBodySchema = t.Object({
  value: t.String({
    description: "String value to store",
    examples: ["hello world"],
  }),
});
export type ItemBody = Static<typeof itemBodySchema>;

const updateItemBodySchema = t.Object({
  value: t.Optional(
    t.String({
      description: "New string value",
      examples: ["updated value"],
    }),
  ),
});
export type UpdateItemBody = Static<typeof updateItemBodySchema>;

const notFoundResponseSchema = t.Null({ description: "Not found" });
export type NotFoundResponse = Static<typeof notFoundResponseSchema>;

const badRequestResponseSchema = t.String({
  description: "Bad request",
  examples: ["Invalid request"],
});
export type BadRequestResponse = Static<typeof badRequestResponseSchema>;

const noContentResponseSchema = t.Null({ description: "No content" });
export type NoContentResponse = Static<typeof noContentResponseSchema>;

const conflictResponseSchema = t.Null({ description: "Conflict" });
export type ConflictResponse = Static<typeof conflictResponseSchema>;

/*
export const getItemStatusSchema = {
  response: {
    200: noContentResponseSchema,
    404: noContentResponseSchema,
  },
  detail: {
    tags,
    summary: "Get Status of an Item",
    description: "Returns the HTTP status codes of an item.",
  },
};
export interface GetItemStatusContract {
  response: {
    200: NoContentResponse;
    404: NoContentResponse;
  };
}
*/

/*
  GET /items
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
export interface GetRandomItemRouteContract {
  response: {
    200: Item;
    404: NotFoundResponse;
  };
}

/*
  GET /items/{id}
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
export interface GetItemByIdRouteContract {
  params: ItemIdParams;
  response: {
    200: string;
    404: NotFoundResponse;
  };
}

/*
  POST /items
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
export interface CreateItemRouteContract {
  body: ItemBody;
  response: {
    201: Item;
  };
}

/*
  PUT /items/:id
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

/*
  PATCH /items/:id
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
export interface UpdateItemRouteContract {
  params: ItemIdParams;
  body: UpdateItemBody;
  response: {
    204: NoContentResponse;
    404: NotFoundResponse;
  };
}

/*
  DELETE /items/:id
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
export interface DeleteItemRouteContract {
  params: ItemIdParams;
  response: {
    204: NoContentResponse;
    404: NotFoundResponse;
  };
}
