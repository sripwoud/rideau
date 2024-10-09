import { NestFactory } from '@nestjs/core'
import { AppModule } from 'server/app.module'
import { TrpcRouter } from 'server/trpc/trpc.router'

// TODO: make port configurable
const PORT = 3001

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  const trpc = app.get(TrpcRouter)
  trpc.applyMiddleware(app)

  await app.listen(PORT)
}

bootstrap()
