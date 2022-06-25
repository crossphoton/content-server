const { request, response } = require("express");
const fs = require("fs/promises");

/**
 * @typedef {Object} FileInfo
 * @property {string} type - MIME type of the file
 * @property {fs.FileHandle} file - FileHandler
 */


const file_resolver = async function (
  /** @type {request} */ req,
  /** @type {response} */ res,
  next
) {
  try {
    /** @type {FileInfo} */ const file = { type: "video/mp4" };

    file.file = await fs.open(__dirname + "/../assets/video.mp4");

    req.file = file;
    next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

module.exports = {
  file_resolver,
};
