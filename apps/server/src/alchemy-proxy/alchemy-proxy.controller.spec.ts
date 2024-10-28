import { Test, type TestingModule } from '@nestjs/testing'
import { AlchemyProxyController } from './alchemy-proxy.controller'

describe('AlchemyProxyController', () => {
  let controller: AlchemyProxyController

  beforeEach(async () => {
    const module: TestingModule = await Test
      .createTestingModule({
        controllers: [AlchemyProxyController],
      })
      .compile()

    controller = module.get<AlchemyProxyController>(AlchemyProxyController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
