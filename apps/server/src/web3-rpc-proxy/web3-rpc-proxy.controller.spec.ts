import { Test, TestingModule } from '@nestjs/testing'
import { Web3RpcProxyController } from './web3-rpc-proxy.controller'

describe('Web3RpcProxyController', () => {
  let controller: Web3RpcProxyController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Web3RpcProxyController],
    }).compile()

    controller = module.get<Web3RpcProxyController>(Web3RpcProxyController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
