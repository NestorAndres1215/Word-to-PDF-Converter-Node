const express = require("express");
const path = require("path");
const fs = require("fs");
const convertirRoutes = require("./routes/convertir.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Crear carpetas necesarias al iniciar
["uploads", "output"].forEach((dir) => {
  const ruta = path.resolve(dir);
  if (!fs.existsSync(ruta)) {
    fs.mkdirSync(ruta, { recursive: true });
    console.log(`📁 Carpeta creada: ${ruta}`);
  }
});

// ✅ Middlewares
app.use(express.urlencoded({ extended: true })); // Para <form> POST
app.use(express.static(path.resolve("public"))); // Archivos estáticos (CSS, JS, imágenes)
app.use("/output", express.static(path.resolve("output"))); // Para servir PDFs

// ✅ Rutas
app.use("/", convertirRoutes);

// ✅ Servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
