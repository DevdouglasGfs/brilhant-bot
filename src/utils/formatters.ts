import chalk from "chalk";

export type ErrorTypes = 'Missing command(s)' | 'Discord API error' | 'Invalid command';
export class FormatErrorMessage<T extends ErrorTypes> {
  type: T;
  info: string;
  constructor(type: T, info: string) {
    this.type = type;
    this.info = info;
  }
  alert() {
    console.group('Error')
    console.error(`<! ${chalk.red(this.type.toUpperCase())} !>`);
    console.info(`> ${chalk.yellow(this.info)}`);
    console.groupEnd()
  }
}
