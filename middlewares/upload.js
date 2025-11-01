const multer = require("multer");
const path = require("path");

// ========================================
// CONSTANTES
// ========================================
const CONSTANTS = {
  EXTENSIONES_PERMITIDAS: [".docx"],
  MAX_FILE_SIZE_MB: 10,
  UPLOAD_DIR: "uploads/",
};

// ========================================
// STORAGE
// ========================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, CONSTANTS.UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    // Normalizar nombre: minúsculas, sin espacios, prefijo timestamp
    const nombreOriginal = file.originalname.toLowerCase().replace(/\s+/g, "_");
    const nombreFinal = `${Date.now()}-${nombreOriginal}`;
    cb(null, nombreFinal);
  },
});

// ========================================
// VALIDACIÓN DE ARCHIVOS
// ========================================
const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();

  if (!CONSTANTS.EXTENSIONES_PERMITIDAS.includes(extension)) {
    return cb(new Error(`Formato no permitido. Solo se permiten: ${CONSTANTS.EXTENSIONES_PERMITIDAS.join(", ")}`));
  }

  cb(null, true);
};

// ========================================
// EXPORTAR MIDDLEWARE MULTER
// ========================================
module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: CONSTANTS.MAX_FILE_SIZE_MB * 1024 * 1024, // límite en bytes
  },
});
