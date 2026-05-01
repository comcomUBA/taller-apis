SRC := src/main.typ
OUT := out/slides-taller-apis.pdf
SOURCES := $(shell find src -type f)

.PHONY: all clean watch

all: $(OUT)

$(OUT): $(SOURCES)
	@mkdir -p out
	typst compile $(SRC) $(OUT)

watch:
	@mkdir -p out
	typst watch $(SRC) $(OUT)

clean:
	rm -rf out/
