import { GestorDijkstra } from "../../utilidades/gestorDijkstra.js";  
import { mostrarError } from '../componentes/mensajesEmergentes.js';
import { mostrarResultadoCamino } from '../componentes/resultadosCamino.js';

export function inicializarEventoCalcularCaminoMasCorto(grafo, manejadorGrafoVis) {
  const gestorDijkstra = new GestorDijkstra(grafo);

  const modalCalcularCamino = new bootstrap.Modal(document.getElementById('modalCalcularCamino'));
  const selectOrigen = document.getElementById('selectOrigen');
  const selectDestino = document.getElementById('selectDestino');
  const btnConfirmarCalcular = document.getElementById('confirmarCalcularCamino');
  const btnCalcularCamino = document.getElementById("btnCalcularCamino");

  btnCalcularCamino.addEventListener("click", () => {
    const grafoValido = grafo.estaVacio() || !grafo.hayAristas() || grafo.cantidadVertices() < 2;
    if (grafoValido) {
      mostrarError("No se puede calcular el camino más corto: el grafo debe tener al menos 2 vértices y 1 arista.");
      return;
    }
    cargarSelect(selectOrigen, grafo);
    cargarSelect(selectDestino, grafo);
    modalCalcularCamino.show();
  });

  btnConfirmarCalcular.addEventListener("click", () => {
    const idOrigen = Number(selectOrigen.value);
    const idDestino = Number(selectDestino.value);

    if (idOrigen && idDestino && (idOrigen !== idDestino)) {
      const resultado = gestorDijkstra.calcularCaminoMasCorto(idOrigen, idDestino);
      mostrarResultadoCamino(resultado, grafo);
      modalCalcularCamino.hide();
      manejadorGrafoVis.resaltarCamino(resultado.camino);
    } else {
      mostrarError("Debes seleccionar un vértice de origen y uno de destino distintos y válidos.");
    }
  });
}

function cargarSelect(select, grafo) {
    select.innerHTML = "";
    const placeholder = document.createElement("option");
    placeholder.textContent = "Seleccioná un vértice";
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);

    grafo.vertices.forEach(vertice => {
      const option = document.createElement("option");
      option.value = vertice.id;
      option.textContent = vertice.nombre;
      select.appendChild(option);
    });
  }