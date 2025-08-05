import {mostrarError, mostrarExito} from '../componentes/mensajesEmergentes.js';
import { ocultarResultadoCamino } from '../componentes/resultadosCamino.js';

export function inicializarEventoEliminarGrafo(grafo, manejadorGrafoVis) {
  const btnEliminarGrafo = document.getElementById("btnEliminarGrafo");
  const modalConfirmacion = new bootstrap.Modal(document.getElementById('modalConfirmacionEliminarGrafo'));
  const btnCancelar = document.getElementById("btnCancelarEliminarGrafo");
  const btnConfirmar = document.getElementById("btnConfirmarEliminarGrafo");

  btnEliminarGrafo.addEventListener("click", () => {
    if(grafo.estaVacio()) {
      mostrarError("El grafo ya fue eliminado.");
      return;
    }
    modalConfirmacion.show();
  });

  btnConfirmar.addEventListener("click", () => {
    manejadorGrafoVis.vaciar();
    grafo.vaciar();
    mostrarExito("Grafo eliminado exitosamente.");
    modalConfirmacion.hide();
    ocultarResultadoCamino();
  });

  btnCancelar.addEventListener("click", () => {
    modalConfirmacion.hide();
  });
}