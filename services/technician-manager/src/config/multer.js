import multer from "multer";

module.exports = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 500000 }
});