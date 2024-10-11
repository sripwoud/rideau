import { Module } from '@nestjs/common'
import { AppController } from 'server/app.controller'
import { AppService } from 'server/app.service'
import { TrpcModule } from 'server/trpc/trpc.module'
import { AlchemyProxyController } from './alchemy-proxy/alchemy-proxy.controller'

@Module({
  imports: [TrpcModule],
  controllers: [AppController, AlchemyProxyController],
  providers: [AppService],
})
export class AppModule {}
