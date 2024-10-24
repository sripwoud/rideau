import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from 'server/app.module'
import { serverConfig } from 'server/l/config'
import { TrpcRouter } from 'server/trpc/trpc.router'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: '*',
    credentials: true,
  })
  app.use(cookieParser())

  const trpc = app.get(TrpcRouter)
  trpc.applyMiddleware(app)

  await app.listen(serverConfig.port)
}

bootstrap()
