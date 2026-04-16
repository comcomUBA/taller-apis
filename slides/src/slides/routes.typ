#import "@preview/touying:0.7.0": *
#import themes.stargazer: *

= Rutas / Routes / Endpoints

== Definición

Una ruta (también conocida como endpoint) es una URL que representa un recurso o una colección de recursos en una API RESTful.

- Las rutas se utilizan para acceder a los recursos y realizar operaciones sobre ellos utilizando los verbos HTTP.

== Ejemplo

En el ejercicio de la lista anónima, las rutas expuestas por la API RESTful son: #pause
- `/items`: representa la colección de ítems y permite realizar operaciones como obtener un ítem aleatorio de la lista (`GET`) o crear un nuevo ítem (`POST`). #pause
- `/items/{id}`: representa un ítem específico identificado por su `id` y permite realizar operaciones como obtener los detalles de un ítem (`GET`), actualizar un ítem (`PUT` o `PATCH`) o eliminar un ítem (`DELETE`).

== Route parameters, query parameters, body & response
- Route parameters (p. ej., `{id}`): se utilizan para identificar recursos específicos. Ejemplo: `/users/:id`

- Query parameters: se utilizan para filtrar, ordenar o paginar recursos. Ejemplo: `/users?age=30&sort=asc`

- Body: se utiliza para enviar datos al servidor en solicitudes `POST`, `PUT` o `PATCH`. \ Ejemplo: #raw("{ \"name\": \"Juan Pérez\" }", lang: "json")

- Response: es la información que el servidor devuelve al cliente después de procesar una solicitud. Ejemplo: \ `HTTP/1.1 200 OK`
  \ #raw("{ \"id\": 1, \"name\": \"Juan Pérez\" }", lang: "json")
