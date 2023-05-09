const fs = require("fs").promises;
const path = require("path");

async function moveFile(file, dir) {
  const { path: tempUpload, filename } = file;
  const resultUpload = path.join(dir, filename);
  await fs.rename(tempUpload, resultUpload);
}

module.exports = moveFile;
