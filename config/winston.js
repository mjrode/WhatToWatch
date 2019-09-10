var appRoot = require('app-root-path');
import { inspect } from 'util';
import path from 'path';
const { createLogger, format, transports } = require('winston');
const {
  combine,
  timestamp,
  label,
  prettyPrint,
  colorize,
  splat,
  errors,
  simple,
} = format;

const prettyJson = format.printf(info => {
  if (info.message.constructor === Object) {
    info.message = inspect(info.message, {
      depth: 3,
      colors: true,
    });
  }
  return `WINSTON: ${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    colorize(),
    prettyPrint(),
    errors({ stack: true }),
    splat(),
    label(),
    timestamp(),
    simple(),
    prettyJson,
  ),
  transports: [
    new transports.File({ filename: `${appRoot}/logs/app.log` }),
    new transports.Console(),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
  write: function(message, encoding) {
    logger.info(message, { level: 'HTTP' });
  },
};

module.exports = logger;
