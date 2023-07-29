/**
 * Logger Interface
 */
export interface LoggerInterface {
  log: (...args: any) => void;
  error: (...args: any) => void;
}

/**
 * Logger Interface Implementation for debug
 */
export class ConsoleLoggerImpl implements LoggerInterface {
  log(...args: any[]): void {
    console.log(...args);
  }

  error(...args: any[]): void {
    console.error(...args);
  }
}

/**
 * Logger Interface Implementation for production
 */
export class OutsideLoggerImpl implements LoggerInterface {
  log(...args: any[]): void {
    console.log('logging using outside service for log');
  }

  error(...args: any[]): void {
    console.log('logging using outside service for error');
  }
}
