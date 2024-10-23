import { Test, type TestingModule } from '@nestjs/testing'
import { RootsService } from './roots.service'

describe('RootsService', () => {
  let service: RootsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RootsService],
    }).compile()

    service = module.get<RootsService>(RootsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
