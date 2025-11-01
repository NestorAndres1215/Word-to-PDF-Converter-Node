document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileInput");
  const fileName = document.getElementById("fileName");
  const uploadArea = document.getElementById("uploadArea");
  const form = document.querySelector("form");
  const loader = document.getElementById("loader");

  const COLOR_ACTIVE = "#4a6fa5";
  const COLOR_IDLE = "#6d98ba";

  function setUploadAreaStyle(border, bg = "transparent") {
    uploadArea.style.borderColor = border;
    uploadArea.style.backgroundColor = bg;
  }

  // ✅ Mostrar nombre + validar tipo
  fileInput.addEventListener("change", () => {
    const archivo = fileInput.files?.[0];

    if (!archivo) return;

    if (!archivo.name.toLowerCase().endsWith(".docx")) {
      fileName.textContent = "⚠️ Solo se permiten archivos .docx";
      fileName.style.color = "#c0392b";
      fileInput.value = ""; // Limpiar selección
      return;
    }

    fileName.style.display = "block";
    fileName.style.color = "";
    fileName.textContent = `Archivo seleccionado: ${archivo.name}`;
    setUploadAreaStyle(COLOR_ACTIVE, "rgba(74, 111, 165, 0.05)");
  });

  // ✅ Drag & Drop UI
  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    setUploadAreaStyle(COLOR_ACTIVE, "rgba(74, 111, 165, 0.1)");
  });

  uploadArea.addEventListener("dragleave", () => {
    setUploadAreaStyle(COLOR_IDLE);
  });

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    setUploadAreaStyle(COLOR_ACTIVE, "rgba(74, 111, 165, 0.05)");

    const archivo = e.dataTransfer.files?.[0];
    if (!archivo) return;

    fileInput.files = e.dataTransfer.files;
    fileInput.dispatchEvent(new Event("change")); // ✅ Dispara validación y UI
  });

  // ✅ Mostrar loader al enviar formulario
  form.addEventListener("submit", () => {
    loader.style.display = "flex";
  });
});
