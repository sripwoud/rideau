import { Test, type TestingModule } from '@nestjs/testing'
import { SemaphoresService } from './semaphores.service'

describe('SemaphoresService', () => {
  let service: SemaphoresService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SemaphoresService],
    }).compile()

    service = module.get<SemaphoresService>(SemaphoresService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
