import { EnvironmentInterface } from "./env.config";
import { ConsoleLogger } from "src/app/_services/logger/console-logger";

export const environment: EnvironmentInterface = {
  production: true,
  loggerProvider: ConsoleLogger,
  authApiBaseUrl: 'https://my-json-server.typicode.com/kidsloop-test/accounts',
};
