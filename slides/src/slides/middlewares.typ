#import "@preview/touying:0.7.0": *
#import themes.stargazer: *
#import "@preview/fletcher:0.5.8" as fletcher: diagram, edge, node
#import fletcher.shapes: hexagon
#let blob(pos, label, tint: white, text-size: 14pt, ..args) = node(
  pos,
  align(center, text(size: text-size, label)),
  width: 30mm,
  height: 20mm,
  fill: tint.lighten(60%),
  stroke: 1pt + tint.darken(20%),
  corner-radius: 5pt,
  ..args,
)
#let arrow_edge(from, to, label: none, text-size: 14pt, ..args) = edge(from, to, "-|>", ..args, label: if label
  != none { text(size: text-size, label) })
#let request = (-4, -2)
#let middleware1_prev = (-2, -2)
#let middleware2_prev = (0, -2)
#let handler = (0, 0)
#let middleware1_post = (0, 2)
#let middleware2_post = (2, 2)
#let response = (4, 2)

= Middlewares

== ¿Qué es un middleware?

Un middleware es una función que se ejecuta *antes* y/o *después* de que un handler (controller) procese una request.

Se puede pensar como una "capa" que intercepta las solicitudes y respuestas.

#align(center)[
  #diagram(
    spacing: 6pt,
    cell-size: (8mm, 10mm),
    edge-stroke: 1pt,
    edge-corner-radius: 5pt,
    mark-scale: 70%,

    blob(request, [Request], tint: blue),
    blob(middleware1_prev, [Middleware 1], tint: green),
    blob(middleware2_prev, [Middleware 2], tint: green),
    blob(handler, [Handler], tint: purple, shape: hexagon),
    blob(middleware1_post, [Middleware 2], tint: green),
    blob(middleware2_post, [Middleware 1], tint: green),
    blob(response, [Response], tint: blue),

    arrow_edge(request, middleware1_prev),
    arrow_edge(middleware1_prev, middleware2_prev),
    arrow_edge(middleware2_prev, handler),
    arrow_edge(handler, middleware1_post),
    arrow_edge(middleware1_post, middleware2_post),
    arrow_edge(middleware2_post, response),
  )
]

== ¿Para qué sirven?

Los middlewares permiten agregar funcionalidad a la aplicación sin modificar los handlers individualmente. Por ejemplo:

- *Logging*: registrar cada solicitud que llega al servidor.
- *Autenticación*: verificar que el usuario tenga un token válido.
- *Autorización*: verificar que el usuario tenga permiso para acceder a la ruta.
- *Validación*: verificar que los datos de la solicitud sean correctos.

== Middlewares en Elysia

```ts
import { Elysia } from 'elysia'

export function middleware_ejemplo(app: Elysia) {
  let middleware_app = app
    .onBeforeHandle(({ request, set }) => {
      // Se ejecuta antes de llegar al handler
    })
    .onAfterHandle(({ request, set }) => {
      // Se ejecuta después de llegar al handler
    });
  
  return middleware_app;
}
```

Hay más métodos que `.onBeforeHandle` y `.onAfterHandle`, por mencionar uno: `.derive` permite agregar contexto a la request (como por ejemplo, el tiempo exacto en que el cliente mandó la request).

== ¿Cómo se usa un middleware en Elysia?

Para usar un middleware, simplemente se agrega con #raw(".use()", lang: "ts"):

```ts
import { Elysia } from "elysia";
import { logger } from "./middlewares/logger";
import { authenticator } from "./middlewares/authenticator";

const app = new Elysia()
  .get("/sin-middleware", () => "No uso ningún middleware.")
  .use(logger)
  .get("/con-logger", () => "Uso logger.")
  .use(authenticator)
  .get("/secret", () => "Uso logger y luego authenticator.")
```

== Ejercicio 3: Proteger rutas con autenticación

En el template tienen las rutas *`/secret`* y *`/users`* sin protección...

*Consigna:*
+ Accedan a *`http://localhost:3000/docs`*.
+ Mándenle un `GET` a *`/secret`* y *`/users`*, vean qué devuelven.
+ Abran los archivos *`secret.routes.ts`* y *`users.routes.ts`* ubicados en la carpeta *`src/routes`*.
+ Importen el middleware *`authenticator`* de *`../middlewares/authenticator`*.
+ Agreguen *#raw(".use(authenticator)", lang: "ts")* antes de la definición de la ruta.
+ Prueben acceder a *`/secret`* y *`/users`*: deberían recibir un status code: `400` y en el body: `Falta el token de autenticación`.
