FROM node:22-alpine AS base
workdir /app
RUN apk update &&\
    apk upgrade &&\
    apk add --no-cache bash dumb-init &&\
    apk cache clean

FROM base AS install
COPY package.json yarn.lock ./
COPY apps/client/package.json apps/client/
COPY apps/server/package.json apps/server/
RUN yarn install --ignore-scripts --frozen-lockfile --production=false

FROM install AS prerelease
COPY tsconfig.json ./
COPY apps/client apps/client
# client uses some types defined in server
COPY apps/server apps/server
COPY config config
RUN yarn workspace client build &&\
    find -type d -name node_modules -exec rm -fr {} + &&\
    yarn install --frozen-lockfile --production=true

FROM base AS release
COPY --from=prerelease /app/node_modules node_modules
COPY --from=prerelease /app/apps/client/node_modules apps/client/node_modules
COPY --from=prerelease /app/apps/client/.next apps/client/.next
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
expose 3000
workdir /app/apps/client
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node_modules/.bin/next", "start"]
