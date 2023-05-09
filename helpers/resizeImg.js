const Jimp = require("jimp");

async function resizeImg(path) {
  Jimp.read(path, (err, lenna) => {
    if (err) throw err;
    lenna
      .resize(250, 250) // resize
      .write(path); // save
  });
}

module.exports = resizeImg;
