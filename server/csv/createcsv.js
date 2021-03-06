/* eslint-disable prefer-const */

const fs = require('fs');
const DataGenerator = require('./csvhelpers.js');

const dg = new DataGenerator();

const writeUsers = fs.createWriteStream('pgImages.csv');

const writeImages = (writer, encoding, cb) => {
  let i = 10000000;
  let id = 0;

  const write = () => {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      let itemId = id;
      let altImages = dg.generateImageArray();

      let data = `${itemId}, ${altImages} \n`;

      if (i === 0) {
        writer.write(data, encoding, cb);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  };
  write();
};

writeImages(writeUsers, 'utf-8', () => {
  writeUsers.end();
});
