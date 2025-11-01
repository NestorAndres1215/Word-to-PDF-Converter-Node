// src/services/convertir.service.js
const fs = require("fs/promises");
const path = require("path");
const { exec } = require("child_process");

// ========================================
// FUNCIONES AUXILIARES
// ========================================
function ejecutarPowerShell(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const comando = `powershell -ExecutionPolicy Bypass -File "${path.resolve("convert.ps1")}" -inputPath "${inputPath}" -outputPath "${outputPath}"`;

    exec(comando, (error, stdout, stderr) => {
      if (error) {
        return reject(new Error(stderr || error.message));
      }
      resolve(stdout);
    });
  });
}

async function convertirDocxAPdf(rutaDocx) {
  try {
    // Validar existencia de carpeta de salida
    const outputDir = path.resolve("output");
    await fs.mkdir(outputDir, { recursive: true });

    const nombrePDF = path.basename(rutaDocx).replace(/\.docx$/i, ".pdf");
    const rutaSalida = path.join(outputDir, nombrePDF);

    // Ejecutar conversión
    await ejecutarPowerShell(path.resolve(rutaDocx), rutaSalida);

    return nombrePDF;
  } catch (error) {
    throw new Error(`Error al convertir el archivo: ${error.message}`);
  }
}

module.exports = { convertirDocxAPdf };
