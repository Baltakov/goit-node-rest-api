import multer from "multer";
import path from "node:path";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
});

const upload = multer({
  storage,
});

export default upload;
