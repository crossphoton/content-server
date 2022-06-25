const defaults = require("./server/defaults");

const config = {
  server: {
    express_app: null,
    base_path: null,
    port: 5000,
    log_level: "info",
    service: "content-server",
  },
  buffer_size: 1000000,
  middlewares: {
    file_resolver: defaults.file_resolver,
  },
};

module.exports = config;
