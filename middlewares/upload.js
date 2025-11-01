const multer = require("multer");
const path = require("path");

// Extensiones permitidas
const EXTENSIONES_PERMITIDAS = [".docx"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Normalizar nombre
    const nombreOriginal = file.originalname.toLowerCase().replace(/\s+/g, "_");
    const nombreFinal = Date.now() + "-" + nombreOriginal;
    cb(null, nombreFinal);
  },
});

// Validar tipo de archivo
const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();

  if (!EXTENSIONES_PERMITIDAS.includes(extension)) {
    return cb(new Error("Solo se permiten archivos .docx"));
  }

  cb(null, true);
};

module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB máximo
  },
});
