const express = require("express");
const path = require("path");
const fs = require("fs");

const convertirRoutes = require("./routes/convertir.routes");

const app = express();
const PORT = 3000;

// Middlewares estáticos
app.use(express.static("public"));
app.use("/output", express.static(path.join(__dirname, "output")));
app.use("/views", express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "public")));

// Rutas
app.use("/", convertirRoutes);

// Crear carpetas necesarias si no existen
["uploads", "output"].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
