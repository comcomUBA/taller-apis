#import "@preview/touying:0.7.0": *
#import themes.stargazer: *

= Schemas

== ¿Qué es un Schema?

Un schema *define la forma de los datos*: qué campos tiene el body, qué tipos tienen, qué restricciones cumplen, y qué devuelve la respuesta.

```ts
const bodySchema = t.Object({
  nombreDeUsuario: t.String({ minLength: 3 }),
  clave: t.String({ minLength: 6 }),
});
```

#pause

Si la request no cumple con el schema, *el framework la rechaza automáticamente* con un `400 Bad Request`, sin necesidad de escribir un solo `if`.

== Sin schema (`register` en `auth.controller.ts`), no entra todo el código en la diapositiva:

```ts
// ... código anterior
  if (!body) {
    set.status = 400
    return "Falta body en la request"
  }
  const { nombreDeUsuario, clave } = body;
  if (!nombreDeUsuario || !clave) {
    set.status = 400
    return "Faltan el nombre del usuario y la clave en la request";
  }
  if (nombreDeUsuario.length < 3) {
    set.status = 400
    return "El nombre de usuario debe tener al menos 3 caracteres";
  }
// ... una validación similar para la clave y el resto del código
```

== Con schema (`register` en `auth.controller.ts`), entra todo el código en la diapositiva:

```ts
  const { body, set } = contexto;
  const { nombreDeUsuario, clave } = body;

  // Acá estarían los chequeos manuales, pero ya no hacen falta porque el schema se encarga de eso.

  try {
    const uuid = await authService.register(nombreDeUsuario, clave)

    const tokenDeAcceso = await crearTokenDeAcceso(uuid)
    set.status = 201
    return {tokenDeAcceso}
  } catch {
    set.status = 409
    return "Ya existe un usuario con ese nombre de usuario";
  }
```

== ¿Cómo se usa un Schema?

El schema se pasa como *tercer argumento* en la definición de la ruta:

```ts
// Antes (sin schema):
.post("/auth/register", authController.register)

// Después (con schema):
.post("/auth/register", authController.register, registrarUnUsuarioSchema)
```

#pause

Además, el controller puede tipar sus parámetros con el *contrato* del schema:

```ts
export async function register(
  contexto: Context<RegistrarUnUsuarioRouteContract> // Toma un contexto que cumple con el contrato
): Promise<RegistrarUnUsuarioRouteContract['response'][201 | 409]> // Devuelve 201 o 409, según el contrato
{ ... }
```

Esto da *autocompletado* y *chequeo de tipos* en el editor.

== Bonus: documentación automática

Al definir schemas, la documentación interactiva (Swagger / Scalar) muestra *automáticamente*:

- Los campos esperados en el body, con sus tipos y restricciones.
- Las posibles respuestas con sus códigos de estado.
- Ejemplos de uso.

#pause

*Todo sin escribir documentación a mano.* Solo por definir los schemas.

== Ejercicio 5: Escribir los schemas de auth

*Parte A -- Schemas (`auth.schemas.ts`):*
+ *Completen el schema* #raw("const iniciarSesionSchema = { ... }", lang: "ts")#footnote[Básense en el schema #raw("const registrarUnUsuarioSchema = { ... }", lang: "ts") que ya está implementado.]:
  - Body: `nombreDeUsuario` (string), `clave` (string).
  - Response 200: objeto con `tokenDeAcceso` (string).
+ *Completen el contrato* #raw("interface IniciarSesionRouteContract { ... }", lang: "ts")#footnote[El contrato #raw("interface RegistrarUnUsuarioRouteContract { ... }", lang: "ts") ya está implementado, úsenlo como referencia.]:
  - Body: `nombreDeUsuario` (string), `clave` (string).
  - Response 200: objeto con `tokenDeAcceso` (string).
  - Response 401: string (mensaje de error).
+ Modifiquen `auth.routes.ts`: pasen los schemas como tercer argumento a cada `.post()`.
  - #raw(".post(\"/auth/register\", authController.register, registrarUnUsuarioSchema)", lang: "ts")
  - #raw(".post(\"/auth/login\", authController.login, iniciarSesionSchema)", lang: "ts")

#pagebreak()

*Parte B -- Autocompletado y chequeo de tipos (opcional):*
+ Cambien la signatura de las funciones en `auth.controller.ts` para que usen los contratos de los schemas.
  - #raw("export async function register(contexto: Context<RegistrarUnUsuarioRouteContract>): Promise<RegistrarUnUsuarioRouteContract['response'][201 | 409]> { ... }", lang: "ts")
  - #raw("export async function login(contexto: Context<IniciarSesionRouteContract>): Promise<IniciarSesionRouteContract['response'][200 | 401]> { ... }", lang: "ts")
+ *Eliminen las validaciones manuales* que ahora son redundantes.
+ Vayan a `/docs` y vean la documentación auto-generada.

#place(right + bottom, pad(x: -70pt, y: -80pt, image("../images/hamster.png", width: 25%)))
