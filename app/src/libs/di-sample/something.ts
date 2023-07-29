import { injectable, inject } from 'tsyringe';
import type { LoggerInterface } from '../logger/logger';

@injectable()
export class DISample {
  constructor(@inject('LoggerDISample') private log: LoggerInterface) {}

  doSomething(arg: any) {
    this.log.log(arg);
  }

  doSomethingWring(arg: any) {
    this.log.error(arg);
  }
}
