import { randomBytes } from "crypto";
import { request } from "http";
import { Options, diskStorage } from "multer";
import { resolve } from "path";
import multer from "multer";

const multerConfig = {
  dest: resolve(__dirname, "..", "..", "uploads"),
  storage: diskStorage({
    destination: (request, file, callback) => {
      callback(null, resolve(__dirname, "..", "..", "uploads"));
    },
    filename: (request, file, callback) => {
      randomBytes(16, (error, hash) => {
        if (error) {
          callback(error, file.filename);
        }
        const filename = `${hash.toString("hex")}.png`;
        callback(null, filename);
      });
    },
  }),
  limits: {
    fileSize: 12 * 1024 * 1024,
  },
  fileFilter: (request, file, callback) => {
    const formats = ["image/jpeg", "image/jpg", "image/png"];
    if (formats.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Format not accepted"));
    }
  },
} as Options;

const uploads = multer(multerConfig);

export default uploads;
