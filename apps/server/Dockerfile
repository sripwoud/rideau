# FIXME: remapping of ts aliases does not work with bun + nestjs
FROM node:20-alpine as base
WORKDIR /app
RUN apk update &&\
    apk upgrade &&\
    apk add --no-cache bash dumb-init &&\
    apk cache clean

FROM base as install
COPY package.json yarn.lock ./
COPY apps/server/package.json apps/server/
RUN yarn install --ignore-scripts --frozen-lockfile --production=false

FROM install as prerelease
COPY tsconfig.json .
COPY apps/server apps/server
RUN yarn workspace server build &&\
    find -type d -name node_modules -exec rm -fr {} + &&\
    yarn install --frozen-lockfile --production=true

FROM base as release
COPY --from=prerelease /app/node_modules node_modules
COPY --from=prerelease /app/apps/server/node_modules node_modules
COPY --from=prerelease /app/apps/server/dist apps/server/dist
ENV NODE_ENV production
USER node
# TODO: make this configurable/overridable
EXPOSE 3001
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "apps/server/dist"]
