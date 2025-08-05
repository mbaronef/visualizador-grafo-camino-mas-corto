import { ocultarResultadoCamino } from "../componentes/resultadosCamino.js";
import { mostrarExito } from "../componentes/mensajesEmergentes.js";

export function inicializarEventoAgregarVertice(grafo, manejadorGrafoVis) {
  const modalAgregarVertice = new bootstrap.Modal(document.getElementById('modalAgregarVertice'));
  const inputNombreVertice = document.getElementById('nombreVerticeInput');
  const btnConfirmarAgregar = document.getElementById('confirmarAgregarVertice');
  const btnAgregarVertice = document.getElementById("btnAgregarVertice");

  btnAgregarVertice.addEventListener("click", () => {
    inputNombreVertice.value = "";
    inputNombreVertice.placeholder = `Ingresá un nombre (si no ingresás uno, se usará "V${grafo.proximoId}")`;
    modalAgregarVertice.show();
  });

  btnConfirmarAgregar.addEventListener("click", () => {
    let nombre = inputNombreVertice.value.trim();
    if (!nombre) {
      nombre = `V${grafo.proximoId}`;
    }

    const id = grafo.agregarVertice(nombre);
    manejadorGrafoVis.agregarNodo({ id: id, label: nombre });
    mostrarExito(`Vértice ${nombre} agregado correctamente`);

    modalAgregarVertice.hide();
    ocultarResultadoCamino();
  });
}