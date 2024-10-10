import { Module } from '@nestjs/common'
import { AppController } from 'server/app.controller'
import { AppService } from 'server/app.service'
import { TrpcModule } from 'server/trpc/trpc.module'
import { Web3RpcProxyController } from './web3-rpc-proxy/web3-rpc-proxy.controller'

@Module({
  imports: [TrpcModule],
  controllers: [AppController, Web3RpcProxyController],
  providers: [AppService],
})
export class AppModule {}
