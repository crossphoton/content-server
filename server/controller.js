const fs = require("fs/promises");
const config = require("../config");
const app = require("express").Router({
  mergeParams: true,
});

const logger = require("../logger");

/**
 * @typedef {Object} FileInfo
 * @property {string} type - MIME type of the file
 * @property {fs.FileHandle} file - FileHandler
 */

app.get("/test", config.middlewares.file_resolver, async (req, res, next) => {
  /** @type {FileInfo} */ const file = req.file;
  const fileStat = await file.file.stat();
  res.setHeader("Content-Type", file.type);
  const range = new URLSearchParams(req.get("range"));

  const position =
      (range.get("bytes") && Number(range.get("bytes").split("-")[0])) || 0,
    length = Math.min(config.buffer_size, fileStat.size - position);

  logger.info(
    `request with position: ${position} range: ${range.get("bytes")}`
  );

  res.setHeader("Content-Length", length);
  res.setHeader(
    "Content-Range",
    `bytes ${position}-${position + length - 1}/${fileStat.size}`
  );

  const buffer = Buffer.alloc(length);
  await file.file.read({
    buffer,
    position,
  });

  res
    .status(position + config.buffer_size >= fileStat.size ? 200 : 206)
    .send(buffer);

  next();

  file.file.close();
});

app.get("/*", (req, res) => {});

module.exports = app;
