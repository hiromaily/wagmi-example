//import 'reflect-metadata'
import { container, singleton, injectable, inject } from 'tsyringe';
import type { LoggerInterface } from './logger';
import { ConsoleLoggerImpl, OutsideLoggerImpl } from './logger';

//@injectable()
@singleton()
export class DILogger {
  constructor(@inject('LoggerIF') private logger: LoggerInterface) {}

  log(...args: any[]) {
    this.logger.log(...args);
  }

  error(...args: any[]) {
    this.logger.error(...args);
  }
}

const loggerFactory = (): LoggerInterface => {
  console.debug(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
  if (process.env.NODE_ENV === 'production') {
    return container.resolve(OutsideLoggerImpl);
  } else {
    return container.resolve(ConsoleLoggerImpl);
  }
};

// DI initialization
// - just put 2 different ways for example
// - useClass is good enough for simple implementation object
// - useValue would be useful when complex initialization is required
export const logger: LoggerInterface = container
  .register('LoggerIF', {
    //useClass: OutsideLoggerImpl,
    //useValue: new OutsideLoggerImpl(),
    useFactory: loggerFactory,
  })
  .resolve(DILogger);
