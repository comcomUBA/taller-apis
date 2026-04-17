FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS install
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

FROM base AS release
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY . .

USER bun
EXPOSE 3000

CMD ["bun", "start"]