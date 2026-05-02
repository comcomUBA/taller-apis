#import "@preview/touying:0.7.0": *
#import themes.stargazer: *

= Autenticación

== ¿Cómo sabe la API quién sos?

Las APIs RESTful son *stateless*: no recuerdan quién sos entre request y request.

#pause

Para resolver esto, se usa un esquema de *tokens*:

+ De una forma u otra, obtenés un *token de acceso* (access token). 
+ Luego, en cada request que requiera autenticación, el cliente envía ese token en el header `Authorization`:
  - `Authorization: Bearer <token>`

#pause

En nuestra API el *token de acceso* se obtiene mediante el endpoint `POST /auth/login`.
+ El cliente envía sus credenciales (usuario y clave) al endpoint de login.
+ Si son correctas, el servidor devuelve un *token de acceso*. 

== JWT (JSON Web Token)

El tipo de token más común es el *JWT* (JSON Web Token)#footnote[¡A pesar de la creencia popular, no es obligatorio usar JWT!].

Lo único que interesa para este taller, es que el token es un string que le permite al servidor identificar al usuario, garantizando que no fue alterado.

== Hashing de claves

Las contraseñas *nunca se guardan en texto plano*. Se guardan como un *hash*: el resultado de una función de una sola vía.

#grid(
  columns: (1fr, 1fr),
  [
    *Texto plano (MAL)*
    ```
    usuario: valen
    clave: 123456
    ```
  ],
  [
    *Hash (BIEN)*
    ```
    usuario: juani
    clave: $2b$10$K4f3...
    ```
  ],
)

#pause

- Al *registrar*: se hashea la clave antes de guardarla.
- Al *hacer login*: se hashea la clave ingresada y se compara con el hash guardado.
- Si alguien accede a la base de datos, *no puede recuperar las claves originales*.
