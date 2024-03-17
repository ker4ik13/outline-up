import * as fs from 'fs';
import * as path from 'path';

export const deleteFiles = (photos: string[]) => {
  photos.map((photo) => {
    fs.unlink(path.join(__dirname, `../../../../uploads/${photo}`), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Файл ${photo} удалён`);
      }
    });
  });
};
