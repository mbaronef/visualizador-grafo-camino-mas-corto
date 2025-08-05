import { mostrarError, mostrarInstruccion, mostrarExito} from '../componentes/mensajesEmergentes.js';
import { ocultarResultadoCamino } from '../componentes/resultadosCamino.js';

export function inicializarEventoEliminarVertice(grafo, manejadorGrafoVis) {
    const btnEliminarVertice = document.getElementById("btnEliminarVertice");
    let seleccionandoVertice = false;

    btnEliminarVertice.addEventListener("click", () => {
      if (grafo.estaVacio()) {
        mostrarError("No hay vértices para eliminar");
        return;
      }

      mostrarInstruccion("Seleccioná el vértice a eliminar");
      seleccionandoVertice = true;
    });

    manejadorGrafoVis.onClickNodo((idVertice) => {
      if (!seleccionandoVertice) return;

      const nodo = manejadorGrafoVis.nodos.get(idVertice);

      try {
        grafo.eliminarVertice(nodo.id);
        manejadorGrafoVis.eliminarNodo(nodo.id);
        ocultarResultadoCamino();
        mostrarExito(`Vértice ${nodo.label} eliminado correctamente`);
      } catch (error) {
        mostrarError(error.message);
      }

    seleccionandoVertice = false;
  });

  document.addEventListener("click", (evento) => {
    if (seleccionandoVertice){
      const contenedorGrafo = document.getElementById("contenedorGrafo");
      const esClickDentroDelContenedor = contenedorGrafo.contains(evento.target);
      const esBotonEliminarVertice = evento.target.closest("#btnEliminarVertice");

      if (!esClickDentroDelContenedor && !esBotonEliminarVertice) {
        cancelarOperacion();
      }
    }
  });

  function cancelarOperacion() {
    seleccionandoVertice = false;
    mostrarError("Operación de eliminar vértice cancelada");
  }
}