FROM oven/bun:1 AS base
WORKDIR /app
COPY package.json .
COPY apps/server/package.json apps/server/

FROM base as install
RUN mkdir -p /temp/dev && mkdir /temp/prod

COPY *.json /temp/dev/
COPY apps/server/*.json /temp/dev/apps/server/

COPY *.json /temp/prod/
COPY apps/server/*.json /temp/prod/apps/server/

RUN cd /temp/dev &&\
    bun i &&\
    cd /temp/prod &&\
    bun i --production

FROM base as prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY --from=install /temp/dev/apps/server/node_modules apps/server/node_modules
COPY tsconfig.json .
COPY apps/server/tsconfig.* apps/server/
COPY apps/server/src apps/server/src

ENV NODE_ENV=production
RUN bun --filter server build

FROM base as release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /app/apps/server/dist apps/server/dist

USER bun
EXPOSE 3001
ENTRYPOINT ["bun", "--filter", "server", "start"]
