import { diskStorage } from 'multer';
import { extname } from 'path';

export const artistStorage = diskStorage({
  destination: './public/uploads/artists',
  filename: (req, file, cb) => {
    const ext = extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  },
});

export const albumStorage = diskStorage({
  destination: './public/uploads/albums',
  filename: (req, file, cb) => {
    const ext = extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  },
});
