// src/utils/messages.js
const MESSAGES = {
  UPLOAD: {
    NO_FILE: "No se subió ningún archivo.",
    ERROR: "Error al subir archivo.",
    INVALID_TYPE: "Formato no permitido. Solo se permiten archivos .docx.",
    TOO_LARGE: "El archivo excede el tamaño máximo permitido (10MB).",
  },
  CONVERT: {
    ERROR: "Error al convertir el archivo.",
  },
  DOWNLOAD: {
    NO_FILE: "No se proporcionó ningún archivo.",
    NOT_FOUND: "Archivo no encontrado.",
  },
  GENERAL: {
    SUCCESS: "Operación realizada con éxito.",
  },
};

module.exports = MESSAGES;
