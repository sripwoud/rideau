import { Test, type TestingModule } from '@nestjs/testing'
import { BandadaService } from './bandada.service'

describe('BandadaService', () => {
  let service: BandadaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BandadaService],
    }).compile()

    service = module.get<BandadaService>(BandadaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
