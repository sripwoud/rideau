import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from 'server/app.module'
import { serverConfig } from 'server/l/config'
import { TrpcRouter } from 'server/trpc/trpc.router'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: '*', // FIXME serverConfig.clientUrl caused CORS issues (e.g cdn.segment.com) troubleshoot later and put back more restrictive CORS settings
    credentials: true,
  })
  app.use(cookieParser())

  const trpc = app.get(TrpcRouter)
  trpc.applyMiddleware(app)

  await app.listen(serverConfig.port)
}

bootstrap()
