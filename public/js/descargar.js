document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const archivo = params.get("archivo");

  const card = document.querySelector(".card");
  const link = document.querySelector("#download-link");

  if (!card) return; // Evita errores si el contenedor no existe

  // ✅ Caso éxito: archivo disponible
  if (archivo && link) {
    const archivoSeguro = encodeURIComponent(archivo);

    link.href = `/output/${archivoSeguro}`;
    link.download = archivo;

    // Mostrar el botón suavemente
    setTimeout(() => link.classList.add("visible"), 50);
    return;
  }

  // ❌ Caso error: archivo no encontrado
  card.innerHTML = `
    <div class="error-message fade-in">
      <i class="fas fa-exclamation-circle"></i>
      <h1>Archivo no encontrado</h1>
      <p>El archivo solicitado no existe o pudo haber sido eliminado.</p>
      <a class="btn btn-secondary" href="/">
        <i class="fas fa-arrow-left"></i> Volver al inicio
      </a>
    </div>
  `;
});
