import { Logger, LogLevel } from './logger';

export class ConsoleLogger extends Logger {
  log(level: LogLevel, message: string, context?: any): void {
    const error = context && context['error'];
    const args = [message];
    if (error) {
      args.push(error);
    }
    if (context) {
      args.push(context);
    }

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(...args);
        break;
      case LogLevel.INFO:
        console.info(...args);
        break;
      case LogLevel.NOTICE:
        console.log(...args);
        break;
      case LogLevel.WARNING:
        console.warn(...args);
        break;
      case LogLevel.ERROR:
        console.error(...args);
        break;
      default:
        console.log(...args);
    }
  }
}
