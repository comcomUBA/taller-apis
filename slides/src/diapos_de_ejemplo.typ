#import "@preview/touying:0.7.0": *
#import themes.stargazer: *
#import "assets/theme.typ": callout-box

= Título 1

== Subtítulo 1

- Ítem 1
- Ítem 2
- Ítem 3

= Título 2

== Subtítulo 2

Texto normal con *negrita* e _itálica_.

#callout-box(title: [Container con título])[Blah blah blah.]

`Rawtext`, y ejemplo de bloque de código:

```rust
fn main() {
  println!("Hello, world!");
}
```

#callout-box[
  Container sin título.
]

= Título 3

== Subtítulo 3

1. Primer punto
2. Segundo punto
3. Tercer punto

Y para el cuarto punto... #pause

4. Hay pausa

== Subtítulo 4

#align(center)[
  #text(size: 1.5em, weight: "semibold")[¿Preguntas?]
]
