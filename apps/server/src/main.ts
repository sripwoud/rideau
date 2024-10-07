import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // TODO: make this configurable
  await app.listen(3001)
}
bootstrap()
