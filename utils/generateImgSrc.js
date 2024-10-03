import fs from "fs";
import path from "path";
const __dirname = path.join();

const assets = {};

const assetsPath = path.join(__dirname, "public/assets");
const categories = fs.readdirSync(assetsPath).filter((item) => {
  const category = path.join(assetsPath, item);
  return fs.statSync(category).isDirectory();
});

const toCamelCase = (fileName) => {
  if (fileName === ".DS_Store") {
    return null;
  }
  const name = fileName
    .split("_")
    .splice(1)
    .map((word, i) => {
      if (i === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");

  return name;
};

categories.forEach((category) => {
  const imgPath = path.join(assetsPath, category);
  const imgNames = fs.readdirSync(imgPath);

  const result = imgNames.reduce((acc, img) => {
    const nameWithOutExt = path.basename(img, path.extname(img));
    const fieldName = toCamelCase(nameWithOutExt);
    if (fieldName) {
      acc[fieldName] = `/assets/${category}/${img}`;
    }

    return acc;
  }, {});
  assets[category] = result;
});
// console로 나온 이미지 객체 복붙해서 씀
console.log(assets);
