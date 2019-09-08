var appRoot = require('app-root-path');
const { createLogger, format, transports } = require('winston');
const {
  combine,
  timestamp,
  label,
  prettyPrint,
  colorize,
  json,
  printf,
} = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: 'debug',
  format: combine(
    colorize(),
    prettyPrint(),
    json(),
    timestamp(),
    myFormat,
  ),
  transports: [
    new transports.File({ filename: `${appRoot}/logs/app.log` }),
    new transports.Console(),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
  write: function(message, encoding) {
    logger.info(message, { label: 'HTTP' });
  },
};

module.exports = logger;
