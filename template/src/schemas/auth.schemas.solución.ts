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
    nombreDeUsuario: t.String({ description: "Nombre de usuario", minLength: 3 }),
    clave: t.String({ description: "Clave del usuario", minLength: 6 }),
  }),
  response: {
    201: t.Object({
      // TODO: Completar con los requerimientos del response para hacer POST /register
      tokenDeAcceso: t.String({ description: "Token de acceso" }),
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
    nombreDeUsuario: string;
    clave: string;
  };
  response: {
    201: {
      // TODO: Completar con los requerimientos del response para hacer POST /register
      tokenDeAcceso: string;
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
    nombreDeUsuario: t.String({ description: "Nombre de usuario" }),
    clave: t.String({ description: "Clave del usuario" }),
  }),
  response: {
    200: t.Object({
      // TODO: Completar con los requerimientos del response para hacer POST /login
      tokenDeAcceso: t.String({ description: "Token de acceso" }),
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
    nombreDeUsuario: string;
    clave: string;
  };
  response: {
    200: {
      // TODO: Completar con los requerimientos del response para hacer POST /login
      tokenDeAcceso: string;
    };
    401: string;
  };
}