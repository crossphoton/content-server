const winston = require("winston");
const config = require("./config");

const logger = winston.createLogger({
  level: config.server.log_level,
  format: winston.format.json(),
  defaultMeta: { service: config.server.service },
  transports: [
    new winston.transports.File({ filename: "server.log" }),
    new winston.transports.Console({
      level: config.server.log_level,
      format: winston.format.simple(),
    }),
  ],
});

module.exports = logger;
