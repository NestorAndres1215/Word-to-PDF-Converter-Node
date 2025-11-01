document.addEventListener("DOMContentLoaded", () => {
  const archivo = new URLSearchParams(window.location.search).get("archivo");
  const card = document.querySelector(".card");
  const link = document.querySelector("#download-link");

  if (!card) return; // Previene errores si se cambia la vista

  // ✅ Si existe archivo válido → Mostrar botón de descarga
  if (archivo && link) {
    const archivoSeguro = encodeURIComponent(archivo);
    link.href = `/output/${archivoSeguro}`;
    link.download = archivo;
    requestAnimationFrame(() => link.classList.add("visible")); // animación suave
    return;
  }

  // ❌ Si no hay archivo → Mostrar mensaje de error
  card.innerHTML = `
    <div class="error-message fade-in">
      <i class="fas fa-exclamation-triangle"></i>
      <h1>No se encontró el archivo</h1>
      <p>Puede que el archivo haya expirado o no exista.</p>
      <a class="btn btn-secondary" href="/">
        <i class="fas fa-home"></i> Volver al inicio
      </a>
    </div>
  `;
});
