import {mostrarInstruccion, mostrarExito, mostrarError} from '../componentes/mensajesEmergentes.js';
import { ocultarResultadoCamino } from '../componentes/resultadosCamino.js';

export function inicializarEventoEliminarArista(grafo, manejadorGrafoVis) {
  const btnEliminarArista = document.getElementById("btnEliminarArista");
  
  let seleccionandoArista = false;
    
  btnEliminarArista.addEventListener("click", () => {
    if(!grafo.hayAristas()) {
      mostrarError("No hay aristas para eliminar");
      return;
    }

    mostrarInstruccion("Seleccioná la arista a eliminar");
    seleccionandoArista = true;
  });

  manejadorGrafoVis.onClickArista((idArista) => {
    if (!seleccionandoArista) return;

    const arista = manejadorGrafoVis.aristas.get(idArista);

    try {
      grafo.eliminarArista(arista.from, arista.to);
      manejadorGrafoVis.eliminarArista(arista.from, arista.to);
      ocultarResultadoCamino();
      mostrarExito(`Arista eliminada correctamente`);
    } catch (error) {
      mostrarError(error.message);
    }

    seleccionandoArista = false;
  });

  document.addEventListener("click", (evento) => {
    if (seleccionandoArista){
      const contenedorGrafo = document.getElementById("contenedorGrafo");
      const esClickDentroDelContenedor = contenedorGrafo.contains(evento.target);
      const esBotonEliminarArista = evento.target.closest("#btnEliminarArista");

      if (!esClickDentroDelContenedor && !esBotonEliminarArista) {
        cancelarOperacion();
      }
    }
  });

  function cancelarOperacion() {
    seleccionandoArista = false;
    mostrarError("Operación de eliminar arista cancelada");
  }
}