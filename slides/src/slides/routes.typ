#import "@preview/touying:0.7.0": *
#import themes.stargazer: *

= Rutas / Routes / Endpoints

== Definición

Una ruta (también conocida como endpoint) es una URL que representa un recurso o una colección de recursos en una API RESTful.

- Las rutas se utilizan para acceder a los recursos y realizar operaciones sobre ellos utilizando los verbos HTTP.

== Ejemplo

En el ejercicio de los strings anónimos, las rutas expuestas por la API RESTful son: #pause

- `/items`: representa la colección de ítems y permite realizar operaciones como obtener un ítem aleatorio de la lista (`GET`) o crear un nuevo ítem (`POST`). #pause

- `/items/{id}`: representa un ítem específico identificado por su `id` y permite realizar operaciones como obtener los detalles de un ítem (`GET`), actualizar un ítem (`PUT` o `PATCH`) o eliminar un ítem (`DELETE`).

== Route parameters, query parameters, body & response
- Route parameters (p. ej., `{id}`): se utilizan para identificar recursos específicos.
  - `/users/:id`

- Query parameters: se pueden utilizar, por ejemplo, para filtrar, ordenar o paginar recursos.
  - `/users?age=30&sort=asc&page=2`

- Body: se utiliza para enviar datos al servidor en solicitudes `POST`, `PUT` o `PATCH`.
  - #raw("{ \"name\": \"Juan Pérez\" }", lang: "json")

- Response: es la información que el servidor devuelve al cliente después de procesar una solicitud.
  - #raw("{ \"id\": 1, \"name\": \"Juan Pérez\" }", lang: "json")
  - `HTTP/1.1 200 OK`

== Ejercicio 2: Creación de rutas (para Colapinto)

En el template tienen una API con varias rutas ya definidas, por ejemplo:

```ts
export const ejemploRoutes = new Elysia()
  .get("/ejemploGet", ejemploController.ejemploRecursoGet)
  .post("/ejemploPost", ejemploController.ejemploRecursoPost);
```

*Consigna:*
+ Descárguense en template y ábranlo en su editor de código.
+ Hagan *`bun install`* para instalar las dependencias.
+ Abran *`auth.routes.ts`* ubicado en la carpeta `src/routes`.
+ Registren dos rutas de tipo `POST`:
  - `/auth/register` $->$ `authController.register`
  - `/auth/login` $->$ `authController.login`
+ Hagan *`bun dev`* para levantar la API.
+ Verifiquen que las rutas aparezcan en *`http://localhost:3000/docs`*.