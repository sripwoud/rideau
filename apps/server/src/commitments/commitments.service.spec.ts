import { Test, type TestingModule } from '@nestjs/testing'
import { CommitmentsService } from './commitments.service'

describe('CommitmentsService', () => {
  let service: CommitmentsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommitmentsService],
    }).compile()

    service = module.get<CommitmentsService>(CommitmentsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
