const fileInput = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");
const uploadArea = document.getElementById("uploadArea");
const form = document.querySelector("form");
const loader = document.getElementById("loader");

fileInput.addEventListener("change", function () {
  if (this.files && this.files[0]) {
    fileName.style.display = "block";
    fileName.textContent = "Archivo seleccionado: " + this.files[0].name;

    uploadArea.style.borderColor = "#4a6fa5";
    uploadArea.style.backgroundColor = "rgba(74, 111, 165, 0.05)";
  }
});

uploadArea.addEventListener("dragover", function (e) {
  e.preventDefault();
  this.style.borderColor = "#4a6fa5";
  this.style.backgroundColor = "rgba(74, 111, 165, 0.1)";
});

uploadArea.addEventListener("dragleave", function (e) {
  e.preventDefault();
  this.style.borderColor = "#6d98ba";
  this.style.backgroundColor = "transparent";
});

uploadArea.addEventListener("drop", function (e) {
  e.preventDefault();
  this.style.borderColor = "#4a6fa5";
  this.style.backgroundColor = "rgba(74, 111, 165, 0.05)";

  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    fileInput.files = e.dataTransfer.files;
    fileName.style.display = "block";
    fileName.textContent =
      "Archivo seleccionado: " + e.dataTransfer.files[0].name;

    // Disparar el evento change manualmente
    const event = new Event("change");
    fileInput.dispatchEvent(event);
  }
});

// Mostrar loader al enviar formulario
form.addEventListener("submit", () => {
  loader.style.display = "flex";
});
