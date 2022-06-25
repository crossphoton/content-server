const express = require("express");
const config = require("../config");
const package_json = require("../package.json");
const app = config.express_app || express();

app.use(config.server.base_path || "/v1/", require("./controller"));

app.get("/status", (_req, res, next) => {
  res.json({
    status: global.server_status || "OK",
    version: package_json.version,
  });
  next();
});

module.exports = app;
