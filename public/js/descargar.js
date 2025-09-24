  const urlParams = new URLSearchParams(window.location.search);
    const archivo = urlParams.get("archivo");
    
    if (archivo) {
      const link = document.getElementById("download-link");
      link.href = `/output/${archivo}`;
      link.download = archivo;
    } else {
      document.querySelector(".card").innerHTML = `
        <div class="error-message">
          <i class="fas fa-exclamation-triangle"></i>
          <h1>No se encontró el archivo</h1>
        </div>
        <a class="btn btn-secondary" href="/">
          <i class="fas fa-home"></i> Volver al inicio
        </a>
      `;
    }