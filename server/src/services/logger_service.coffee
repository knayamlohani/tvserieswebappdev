winston = require 'winston'

winston.configure
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'server.log' })
  ]


module.exports = winston