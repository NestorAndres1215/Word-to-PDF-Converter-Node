// src/controllers/convertir.controller.js
const path = require("path");
const fs = require("fs");
const upload = require("../middlewares/upload");
const { convertirDocxAPdf } = require("../services/convertir.service");
const MESSAGES = require("../utils/messages");

// ========================================
// CONTROLLER
// ========================================
const convertirArchivo = (req, res) => {
  upload.single("archivo")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ mensaje: MESSAGES.UPLOAD.ERROR, detalle: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ mensaje: MESSAGES.UPLOAD.NO_FILE });
    }

    const archivoSubido = req.file.path;

    try {
      // Llamada al service que hace la conversión
      const nombrePDF = await convertirDocxAPdf(archivoSubido);

      // Limpiar archivo original subido
      fs.unlink(archivoSubido, (unlinkErr) => {
        if (unlinkErr) console.warn("No se pudo eliminar el archivo temporal:", unlinkErr.message);
      });

      // Redirigir a página de descarga
      return res.redirect(`/descarga?archivo=${encodeURIComponent(nombrePDF)}`);
    } catch (error) {
      // Intentar limpiar archivo subido aunque haya error
      fs.unlink(archivoSubido, () => {});
      return res.status(500).json({
        mensaje: MESSAGES.CONVERT.ERROR,
        detalle: error.message,
      });
    }
  });
};

const mostrarDescarga = (req, res) => {
  const nombreArchivo = req.query.archivo;
  if (!nombreArchivo) {
    return res.status(400).json({ mensaje: MESSAGES.DOWNLOAD.NO_FILE });
  }

  const rutaArchivo = path.resolve("output", nombreArchivo);

  if (!fs.existsSync(rutaArchivo)) {
    return res.status(404).json({ mensaje: MESSAGES.DOWNLOAD.NOT_FOUND });
  }

  return res.sendFile(path.resolve("views", "descargar.html"));
};

module.exports = { convertirArchivo, mostrarDescarga };
