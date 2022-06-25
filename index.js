const server = require("./server");
const config = require("./config");
const logger = require("./logger");

const port = config.server.port || 5000,
host = config.server.host || "0.0.0.0";

server.listen(port, host, () => logger.info(`server started at ${host}:${port}`));
