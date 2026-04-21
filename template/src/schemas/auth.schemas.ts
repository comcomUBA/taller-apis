import { t } from "elysia";

/**
 * @description Tags para documentación de API
 */
const tags = ["Auth"];

/*
  Schemas generales
*/

/**
 * @description Schema de respuesta 401
 */
const unauthorizedResponseSchema = t.String({
  description: "No autorizado",
  examples: ["Unauthorized"],
});

/**
 * @description Schema de respuesta 409
 */
const conflictResponseSchema = t.String({
  description: "Conflicto",
  examples: ["Conflict"],
});

/*
  POST /register
*/

/**
 * @description Schema de la ruta POST /register
 */

export const registrarUnUsuarioSchema = {
  body: t.Object({
    // TODO: Completar con los requerimientos del body para hacer POST /register, tener en cuenta el minLength para nombreDeUsuario y clave
    // ...
  }),
  response: {
    201: t.Object({
      // TODO: Completar con los requerimientos del response para hacer POST /register
      // ...
    }),
    409: conflictResponseSchema,
  },
  detail: {
    tags,
    summary: "Registrarse",
    description: "Registra un nuevo usuario.",
  },
};

export interface RegistrarUnUsuarioRouteContract {
  body: {
    // TODO: Completar con los requerimientos del body para hacer POST /register
    // ...
  };
  response: {
    201: {
      // TODO: Completar con los requerimientos del response para hacer POST /register
      // ...
    };
    409: string;
  };
}


/*
  POST /login
*/

/**
 * @description Schema de la ruta POST /login
 */

export const iniciarSesionSchema = {
  body: t.Object({
    // TODO: Completar con los requerimientos del body para hacer POST /login
    // ...
  }),
  response: {
    200: t.Object({
      // TODO: Completar con los requerimientos del response para hacer POST /login
      // ...
    }),
    401: unauthorizedResponseSchema,
  },
  detail: {
    tags,
    summary: "Login",
    description: "Inicia sesión.",
  },
};

export interface IniciarSesionRouteContract {
  body: {
    // TODO: Completar con los requerimientos del body para hacer POST /login
    // ...
  };
  response: {
    200: {
      // TODO: Completar con los requerimientos del response para hacer POST /login
      // ...
    };
    401: string;
  };
}