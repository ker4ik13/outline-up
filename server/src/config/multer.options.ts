import type { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

export const multerOptions: MulterOptions = {
  storage: diskStorage({
    destination: '../uploads',
    filename: (req, file, callback) => {
      callback(
        null,
        `${new Date().toLocaleString('ru')}-${Buffer.from(
          file.originalname,
          'latin1',
        )}`.toString(),
      );
    },
  }),
};
