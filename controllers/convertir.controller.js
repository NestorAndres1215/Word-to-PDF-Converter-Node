const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const upload = require("../middlewares/upload");

const convertirArchivo = (req, res) => {
  upload.single("archivo")(req, res, (err) => {
    if (err) return res.status(400).send("Error al subir archivo: " + err.message);
    if (!req.file) return res.status(400).send("No se subió ningún archivo.");

    const archivoSubido = req.file.path;
    const nombrePDF = req.file.filename.replace(/\.docx$/i, ".pdf");
    const rutaSalida = path.join("output", nombrePDF);

    const comando = `powershell -ExecutionPolicy Bypass -File "${path.resolve("convert.ps1")}" -inputPath "${path.resolve(archivoSubido)}" -outputPath "${path.resolve(rutaSalida)}"`;

    exec(comando, (error) => {
      fs.unlink(archivoSubido, () => {}); // eliminar DOCX original

      if (error || !fs.existsSync(rutaSalida)) {
        return res.status(500).send("Error al convertir el archivo.");
      }

      res.redirect(`/descarga?archivo=${encodeURIComponent(nombrePDF)}`);
    });
  });
};

const mostrarDescarga = (req, res) => {
  const nombreArchivo = req.query.archivo;
  const rutaArchivo = path.join(__dirname, "../output", nombreArchivo);

  if (!fs.existsSync(rutaArchivo)) {
    return res.status(404).send("Archivo no encontrado.");
  }

  res.sendFile(path.join(__dirname, "../views", "descargar.html"));
};

module.exports = { convertirArchivo, mostrarDescarga };
