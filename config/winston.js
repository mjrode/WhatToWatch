var appRoot = require('app-root-path');
import path from 'path';
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

function formatParams(info) {
  let { timestamp, level, message, label, ...args } = info;
  const ts = timestamp.slice(0, 19).replace('T', ' ');
  if (!label) label = 'App';
  return `${ts} ${label} ${level}: ${message} ${
    Object.keys(args).length ? JSON.stringify(args, '', '') : ''
  }`;
}

const logger = createLogger({
  level: 'debug',
  format: combine(
    colorize(),
    prettyPrint(),
    json(),
    timestamp(),
    printf(formatParams),
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
