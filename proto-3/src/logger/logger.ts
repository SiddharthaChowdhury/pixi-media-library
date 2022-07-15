import chalk from "chalk";

export type TypeLog = (
  msg: string,
  params?: any
) => {
  error: (prefix?: string) => void;
  highlight: (prefix?: string) => void;
  print: (prefix?: string) => void;
  good: (prefix?: string) => void;
  warn: (prefix?: string) => void;
};

const log: TypeLog = (msg: string = "", params: any = {}) => {
  const l = console.log;

  return {
    error: (prefix: string = "") =>
      l(
        `${chalk.bgRedBright.bold.yellowBright(
          prefix || " ERROR: "
        )} ${chalk.whiteBright(msg)}`,
        params
      ),
    highlight: (prefix: string = "") =>
      l(chalk.bgGreenBright.black(` ${prefix} ${msg}`), params),
    print: (prefix: string = "") =>
      l(`${chalk.black.bold(` ${prefix} ${msg}`)}`, params),
    good: (prefix: string = "") =>
      l(`${chalk.green(` ${prefix} ${msg}`)}`, params),
    warn: (prefix: string = "") =>
      l(`${chalk.hex("#fc6b03")(` ${prefix} ${msg}`)}`, params),
  };
};

export default log;
