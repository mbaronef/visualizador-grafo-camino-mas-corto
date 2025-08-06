function crearToast(mensaje, tipo = 'info') {
  const contenedor = document.getElementById('contenedorToasts');

  const divToast = document.createElement('div');
  divToast.className = `toast toast-custom toast-${tipo} fade border-0 mb-2`;
  divToast.setAttribute('role', 'alert');
  divToast.setAttribute('aria-live', 'assertive');
  divToast.setAttribute('aria-atomic', 'true');

  divToast.innerHTML = `
    <div class="d-flex w-100">
      <div class="toast-body">${mensaje}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
    </div>
  `;

  contenedor.appendChild(divToast);

  const toast = new bootstrap.Toast(divToast, { delay: 3000 });
  toast.show();

  divToast.addEventListener('hidden.bs.toast', () => {
    divToast.remove();
  });
}

export function mostrarInstruccion(mensaje) {
  crearToast(mensaje, 'info');
}

export function mostrarError(mensaje) {
  crearToast(mensaje, 'error');
}

export function mostrarExito(mensaje) {
  crearToast(mensaje, 'exito');
}
