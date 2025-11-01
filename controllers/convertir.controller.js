const path = require("path");
const fs = require("fs");
const upload = require("../middlewares/upload");
const { convertirDocxAPdf } = require("../services/convertir.service");

const convertirArchivo = (req, res) => {
  upload.single("archivo")(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({ mensaje: "Error al subir archivo", detalle: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ mensaje: "No se subió ningún archivo" });
      }

      const archivoSubido = req.file.path;

      // Llamamos al service
      const nombrePDF = await convertirDocxAPdf(archivoSubido);

      return res.redirect(`/descarga?archivo=${encodeURIComponent(nombrePDF)}`);

    } catch (error) {
      return res.status(500).json({
        mensaje: "Error al convertir el archivo",
        detalle: error.message,
      });
    }
  });
};

const mostrarDescarga = (req, res) => {
  const nombreArchivo = req.query.archivo;
  const rutaArchivo = path.resolve("output", nombreArchivo);

  if (!fs.existsSync(rutaArchivo)) {
    return res.status(404).json({ mensaje: "Archivo no encontrado" });
  }

  return res.sendFile(path.resolve("views", "descargar.html"));
};

module.exports = { convertirArchivo, mostrarDescarga };
