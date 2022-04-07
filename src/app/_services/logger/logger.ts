export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  NOTICE = 'notice',
  WARNING = 'warning',
  ERROR = 'error',
}

export abstract class Logger {
  debug(message: string, context?: any): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  info(message: string, context?: any): void {
    this.log(LogLevel.INFO, message, context);
  }

  notice(message: string, context?: any): void {
    this.log(LogLevel.NOTICE, message, context);
  }

  warn(message: string, context?: any): void {
    this.log(LogLevel.WARNING, message, context);
  }

  error(message: string, context?: any): void {
    this.log(LogLevel.ERROR, message, context);
  }

  abstract log(level: LogLevel, message: string, context?: any): void;

  protected processContext(context: any = {}): JsonType {
    if (context instanceof Error) {
      return this.normalize(
        this.errorToJson(context)
      );
    }

    if (context['error'] && context['error'] instanceof Error) {
      return this.normalize({
        ...context,
        ...this.errorToJson(context['error'])
      });
    }

    return this.normalize(context);
  }

  protected errorToJson(error: Error): JsonMap {
    return {
      error: error.message,
      stack: error.stack,
    } as JsonMap;
  }

  protected normalize(obj: any): JsonType {
    const visited = new Set();
    const str = JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (visited.has(value)) {
          return;
        }
        visited.add(value);
      }

      return value;
    });

    return JSON.parse(str) || {};
  }
}
