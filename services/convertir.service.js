const fs = require("fs/promises");
const path = require("path");
const { exec } = require("child_process");

function ejecutarPowerShell(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const comando = `powershell -ExecutionPolicy Bypass -File "${path.resolve("convert.ps1")}" -inputPath "${inputPath}" -outputPath "${outputPath}"`;

    exec(comando, (error) => {
      if (error) return reject(error);
      resolve();
    });
  });
}

async function convertirDocxAPdf(rutaDocx) {
  const nombrePDF = path.basename(rutaDocx).replace(/\.docx$/i, ".pdf");
  const rutaSalida = path.resolve("output", nombrePDF);

  await ejecutarPowerShell(path.resolve(rutaDocx), rutaSalida);

  // Eliminar archivo original
  await fs.unlink(rutaDocx);

  return nombrePDF;
}

module.exports = { convertirDocxAPdf };
