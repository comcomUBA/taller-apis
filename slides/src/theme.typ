#import "@preview/touying:0.7.0": *
#import themes.stargazer: *
#import "@preview/shadowed:0.3.0": shadow
#import "@preview/codly:1.3.0": *
#import "@preview/codly-languages:0.1.10": *

#let primaryColor = rgb("#8DC795")
#let secondaryColor = rgb("#E4DCAB")
#let accentColor = red
#let ink = rgb("#131c14")

#let default-author = [ComCom]
#let default-institution = [Departamento de Computación \ FCEyN UBA]
#let default-footer-a = [ComCom (DC - FCEyN - UBA)]

#let build-theme(
  title,
  date,
  date-footer,
  author: default-author,
  institution: default-institution,
  footer-a: default-footer-a,
) = {
  stargazer-theme.with(
    progress-bar: false,
    config-common(
      preamble: {
        codly(languages: codly-languages)
      },
      new-section-slide-fn: (config: (:), title: none, ..args, body) => touying-slide-wrapper(self => {
        self.store.title = none
        let content = {
          set align(horizon + center)
          context {
            let title-content = text(size: 1.6em, weight: "bold", fill: ink, utils.display-current-heading(depth: 1))
            let title-width = measure(title-content).width + 2em
            title-content
            v(-1.2em)
            line(length: title-width, stroke: 1pt + primaryColor)
          }
        }
        touying-slide(self: self, config: config, content)
      }),
    ),
    config-methods(init: (self: none, body) => {
      set text(size: 20pt)
      set list(marker: box(
        width: 0.5em,
        height: 0.5em,
        baseline: 0.6em,
        fill: primaryColor,
        stroke: none,
      ))
      show figure.caption: set text(size: 0.6em)
      show footnote.entry: set text(size: 0.8em)
      show heading: set text(fill: primaryColor)
      show link: it => if type(it.dest) == str {
        set text(fill: primaryColor)
        it
      } else {
        it
      }
      show figure.where(kind: table): set figure.caption(position: top)
      body
    }),
    config-page(
      paper: "presentation-4-3",
      fill: rgb("#ffffff"),
      margin: (x: 1.5em, y: 3em),
    ),
    config-info(
      title: title,
      author: author,
      institution: institution,
      date: date,
    ),
    config-colors(
      primary: ink,
      secondary: primaryColor,
      tertiary: secondaryColor,
      neutral-lightest: ink,
      neutral-darkest: ink,
    ),
    config-store(
      footer-columns: (1fr, 2fr, 0.5fr, 0.5fr),
      navigation: none,
      header: self => if self.store.title != none {
        block(
          width: 100%,
          height: 1.75em,
          fill: primaryColor,
          place(
            left + horizon,
            text(
              fill: ink,
              size: 1.05em,
              utils.call-or-display(self, self.store.title),
            ),
            dx: 0.65em,
          ),
        )
      },
      footer: self => {
        let cell(fill: none, text-fill: ink, it) = rect(
          width: 100%,
          height: 100%,
          inset: 1mm,
          outset: 0mm,
          fill: fill,
          stroke: none,
          std.align(horizon, text(fill: text-fill, it)),
        )

        grid(
          columns: self.store.footer-columns,
          rows: (1.5em, auto),
          cell(fill: primaryColor, utils.call-or-display(self, self.store.footer-a)),
          cell(fill: secondaryColor, text-fill: accentColor, utils.call-or-display(self, self.store.footer-b)),
          cell(fill: primaryColor, utils.call-or-display(self, self.store.footer-c)),
          cell(
            fill: primaryColor,
            utils.call-or-display(self, self.store.footer-d),
          ),
        )
      },
    ),
    footer-a: footer-a,
    footer-b: title,
    footer-c: date-footer,
  )
}

#let wide-title-slide(config: (:), extra: none, ..args) = touying-slide-wrapper(
  self => {
    self = utils.merge-dicts(self, config)
    self.store.title = none

    let info = self.info + args.named()
    info.authors = {
      let authors = if "authors" in info { info.authors } else { info.author }
      if type(authors) == array { authors } else { (authors,) }
    }

    let body = {
      show: std.align.with(center + horizon)

      shadow(dx: 6pt, dy: 6pt, blur: 22pt, fill: rgb("#00000070"), radius: 6pt)[
        #block(
          width: 100%,
          fill: self.colors.secondary,
          inset: 1.2em,
          radius: 0.5em,
          breakable: false,
          align(center)[
            #text(
              size: 1.2em,
              fill: self.colors.neutral-lightest,
              weight: "semibold",
              info.title,
            )
            #if info.subtitle != none {
              parbreak()
              text(
                size: 1.0em,
                fill: self.colors.neutral-lightest,
                weight: "bold",
                info.subtitle,
              )
            }
          ],
        )
      ]

      stack(
        dir: ttb,
        spacing: 1em,
        ..info
          .authors
          .chunks(3)
          .map(author-chunk => {
            grid(
              columns: (1fr,) * author-chunk.len(),
              column-gutter: 1em,
              ..author-chunk.map(author => text(fill: black, author))
            )
          }),
      )
      v(0.5em)

      if info.institution != none {
        parbreak()
        text(size: 0.7em, info.institution)
      }
      if info.date != none {
        parbreak()
        text(size: 1.0em, utils.display-info-date(self))
      }
      if extra != none {
        parbreak()
        text(size: 0.8em, extra)
      }
    }

    touying-slide(self: self, body)
  },
)
