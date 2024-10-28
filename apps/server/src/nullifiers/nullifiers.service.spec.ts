import { Test, type TestingModule } from '@nestjs/testing'
import { NullifiersService } from './nullifiers.service'

describe('NullifiersService', () => {
  let service: NullifiersService

  beforeEach(async () => {
    const module: TestingModule = await Test
      .createTestingModule({
        providers: [NullifiersService],
      })
      .compile()

    service = module.get<NullifiersService>(NullifiersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
