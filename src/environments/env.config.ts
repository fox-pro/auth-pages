import { InjectionToken, Type } from "@angular/core";
import { Logger } from "src/app/_services/logger/logger";

export const ENVIRONMENT = new InjectionToken<EnvironmentInterface>('ENVIRONMENT');

export interface EnvironmentInterface {
  production: boolean;
  loggerProvider: Type<Logger>;
  authApiBaseUrl: string;
  defaultLanguage: string;
}
