const express = require("express");
const router = express.Router();
const path = require("path");

const { convertirArchivo, mostrarDescarga } = require("../controllers/convertir.controller");

// Página principal
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "index.html"));
});

// Subir y convertir
router.post("/convertir", convertirArchivo);

// Página de descarga
router.get("/descarga", mostrarDescarga);

module.exports = router;
