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
#let arrow_edge(from, to, label: none, text-size: 14pt, ..args) = edge(from, to, "<|-|>", ..args, label: if label
  != none { text(size: text-size, label) })

= ¿Cómo se estructura un proyecto? (una posibilidad)

== Patrón Controller-Service-Repository (CSR)

Una forma de organizar el código es separarlo en directorios, cada uno con una responsabilidad:

```
src/
├── routes/          Definen los endpoints (paths + verbos HTTP)
├── controllers/     Reciben la request y deciden la respuesta
├── services/        Contienen la lógica de negocio
├── repositories/    Acceso a la base de datos
├── schemas/         Definen la forma (y validación) de los datos
├── middlewares/     Funciones que interceptan requests
└── databases/       Configuración/conexión a la base de datos
```
También puede estar presente un directorio `utils` para funciones de utilidad.

Generalmente, para cada recurso (p. ej. `items`, `users`, `auth`) existe un archivo en `routes`, `controllers` y `services`; a veces también en `repositories`.

_Dependiendo del proyecto, las tecnologías utilizadas o las preferencias del equipo, algunos directorios pueden no existir o pueden tener otros nombres._

== Flujo de una request

#align(center)[
  #diagram(
    spacing: 6pt,
    cell-size: (8mm, 10mm),
    edge-stroke: 1pt,
    edge-corner-radius: 5pt,
    mark-scale: 70%,

    blob((-5.5, 0), [Cliente], tint: gray, text-size: 12pt),
    blob((-2.75, 0), [*Route*], tint: blue, text-size: 12pt),
    blob((0, 0), [*Controller*], tint: green, text-size: 12pt),
    blob((2.75, 0), [*Service*], tint: purple, text-size: 12pt),
    blob((5.5, 0), [*Repository*], tint: orange, text-size: 12pt),
    blob((8.5, 0), [Base de\ datos], tint: gray, text-size: 12pt),

    arrow_edge((-5.5, 0), (-2.75, 0), text-size: 10pt),
    arrow_edge((-2.75, 0), (0, 0), text-size: 10pt),
    arrow_edge((0, 0), (2.75, 0), text-size: 10pt),
    arrow_edge((2.75, 0), (5.5, 0), text-size: 10pt),
    arrow_edge((5.5, 0), (8.5, 0), text-size: 10pt),
  )
]

- La *route* recibe la request y la dirige al *controller*.
- El *controller* decide qué hacer y delega al *service*.
- El *service* ejecuta la lógica de negocio y usa el *repository* para acceder a los datos.
- Los *schemas* validan los datos automáticamente (los vamos a ver más adelante).

Vamos a ir viendo cada una de estas partes a medida que las necesitemos.

#place(right + bottom, pad(x: -30pt, y: -50pt, image("../images/gato-triste.png", width: 25%)))
