//import 'reflect-metadata'
import { container, injectable, inject } from 'tsyringe'
import type { LoggerInterface } from './logger'
import {ConsoleLoggerImpl, OutsideLoggerImpl} from './logger'

@injectable()
export class DILogger {
  constructor(
    @inject('LoggerInterface') private logger: LoggerInterface
  ) {}

  log(...args: any[]) {
    this.logger.log(...args)
  }

  error(...args: any[]) {
    this.logger.error(...args)
  }
}

// DI initialization
export const logger: LoggerInterface = container
    .register('LoggerInterface', {
        useClass: OutsideLoggerImpl,
    })
    .resolve(DILogger)
