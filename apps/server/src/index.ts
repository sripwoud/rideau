import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from 'server/app.module'
import config from 'server/l/config'
import { TrpcRouter } from 'server/trpc/trpc.router'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: config.clientUrl,
    credentials: true,
  })
  app.use(cookieParser())

  const trpc = app.get(TrpcRouter)
  trpc.applyMiddleware(app)

  await app.listen(config.port)
}

bootstrap()
