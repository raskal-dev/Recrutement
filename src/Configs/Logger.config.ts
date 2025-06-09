import pino from "pino";

const logger = pino({
    browser: {
        serialize: true,
      },
    transport: {
        target: 'pino-pretty',
        options: {
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
            colorize: true
        }
    }
});

export default logger;