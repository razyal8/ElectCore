import pino from 'pino';

const transport = {
  target: 'pino-pretty',
  options: {
    colorize: true,
    translateTime: 'SYS:standard',
  },
};

const logger = pino(
  {
    level: process.env.NODE_ENV !== 'test' ? 'info' : 'silent',
    transport,
  },
);

export default logger;
