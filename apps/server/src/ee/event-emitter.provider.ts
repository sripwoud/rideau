import { Provider } from '@nestjs/common'
import { EventEmitter } from 'events'

export const EE = 'EVENT_EMITTER'

export const EventEmitterProvider: Provider = {
  provide: EE,
  useValue: new EventEmitter(),
}
