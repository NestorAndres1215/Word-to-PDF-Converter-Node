document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileInput");
  const fileName = document.getElementById("fileName");
  const uploadArea = document.getElementById("uploadArea");
  const form = document.querySelector("form");
  const loader = document.getElementById("loader");

  // ========================================
  // CONSTANTES
  // ========================================
  const CONSTANTS = {
    COLORS: {
      ACTIVE: "#4a6fa5",
      IDLE: "#6d98ba",
      ERROR: "#c0392b",
      BG_ACTIVE: "rgba(74, 111, 165, 0.05)",
      BG_HOVER: "rgba(74, 111, 165, 0.1)"
    },
    EXTENSIONS: [".docx"],
    MAX_FILE_SIZE_MB: 10
  };

  // ========================================
  // FUNCIONES AUXILIARES
  // ========================================
  const setUploadAreaStyle = (borderColor, bgColor = "transparent") => {
    uploadArea.style.borderColor = borderColor;
    uploadArea.style.backgroundColor = bgColor;
  };

  const validarArchivo = (archivo) => {
    const ext = archivo.name.slice(archivo.name.lastIndexOf(".")).toLowerCase();
    if (!CONSTANTS.EXTENSIONS.includes(ext)) return false;
    if (archivo.size > CONSTANTS.MAX_FILE_SIZE_MB * 1024 * 1024) return false;
    return true;
  };

  const mostrarArchivoSeleccionado = (archivo) => {
    fileName.style.display = "block";
    fileName.style.color = "";
    fileName.textContent = `Archivo seleccionado: ${archivo.name}`;
    setUploadAreaStyle(CONSTANTS.COLORS.ACTIVE, CONSTANTS.COLORS.BG_ACTIVE);
  };

  const mostrarErrorArchivo = (mensaje) => {
    fileName.style.display = "block";
    fileName.style.color = CONSTANTS.COLORS.ERROR;
    fileName.textContent = mensaje;
    fileInput.value = "";
    setUploadAreaStyle(CONSTANTS.COLORS.IDLE);
  };

  // ========================================
  // EVENTOS
  // ========================================
  // Cambio de input
  fileInput.addEventListener("change", () => {
    const archivo = fileInput.files?.[0];
    if (!archivo) return;

    if (!validarArchivo(archivo)) {
      mostrarErrorArchivo("⚠️ Solo se permiten archivos .docx y menor a 10MB");
      return;
    }

    mostrarArchivoSeleccionado(archivo);
  });

  // Drag & Drop
  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    setUploadAreaStyle(CONSTANTS.COLORS.ACTIVE, CONSTANTS.COLORS.BG_HOVER);
  });

  uploadArea.addEventListener("dragleave", () => {
    setUploadAreaStyle(CONSTANTS.COLORS.IDLE);
  });

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    setUploadAreaStyle(CONSTANTS.COLORS.ACTIVE, CONSTANTS.COLORS.BG_ACTIVE);

    const archivo = e.dataTransfer.files?.[0];
    if (!archivo) return;

    fileInput.files = e.dataTransfer.files;
    fileInput.dispatchEvent(new Event("change"));
  });

  // Loader al enviar
  form.addEventListener("submit", () => {
    loader.style.display = "flex";
  });
});
