import { Module } from '@nestjs/common'
import { AppController } from 'server/app.controller'
import { AppService } from 'server/app.service'
import { TrpcModule } from 'server/trpc/trpc.module'

@Module({
  imports: [TrpcModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
