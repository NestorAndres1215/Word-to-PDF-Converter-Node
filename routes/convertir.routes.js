const express = require("express");
const router = express.Router();
const path = require("path");
const { convertirArchivo, mostrarDescarga } = require("../controllers/convertir.controller");

// ✅ Página principal (Vista)
router.get("/", (req, res) => {
  return res.sendFile(path.resolve("views", "index.html"));
});

// ✅ Subir y convertir archivo
router.post("/convertir", convertirArchivo);

// ✅ Mostrar página que permite descargar el PDF ya convertido
router.get("/descarga", mostrarDescarga);

module.exports = router;
