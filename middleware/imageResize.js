const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const outputFolder = "public/assets";

module.exports = async (req, res, next) => {
  
    const image = await sharp(req.file.path)
        .resize(2000)
        .jpeg({ quality: 50 })
        .toFile(path.resolve(outputFolder, req.file.filename + ".jpg"));

    fs.unlinkSync(req.file.path);
  

    req.image = image.filename;

    next();
};
