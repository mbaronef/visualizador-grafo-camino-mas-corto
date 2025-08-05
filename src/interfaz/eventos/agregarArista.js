import {mostrarInstruccion, mostrarError, mostrarExito} from '../componentes/mensajesEmergentes.js';
import { ocultarResultadoCamino } from '../componentes/resultadosCamino.js';  

export function inicializarEventoAgregarArista(grafo, manejadorGrafoVis) {
  const btnAgregarArista = document.getElementById("btnAgregarArista");
  const pesoInput = document.getElementById("pesoInput");
  const confirmarPesoBtn = document.getElementById("confirmarPesoBtn");
  const modalPesoArista = new bootstrap.Modal(document.getElementById("modalPesoArista"));

  let seleccionandoArista = false;
  let esperandoConfirmacionPeso = false;
  let nodoOrigen = null;
  let nodoDestino = null;

  btnAgregarArista.addEventListener("click", () => {
    if (!validarGrafoValido(grafo)) return;
    nodoOrigen = null;
    nodoDestino = null;
    seleccionandoArista = true;
    mostrarInstruccion("Seleccioná el primer nodo de la arista");
  });

  manejadorGrafoVis.onClickNodo((idNodo) => {
    if (!seleccionandoArista) return;

    if (!nodoOrigen) {
      nodoOrigen = idNodo;
      mostrarInstruccion("Seleccioná el segundo nodo de la arista");
    } else if (!nodoDestino) {
      if (!validarNodoDestino(grafo, nodoOrigen, idNodo)) return;
      nodoDestino = idNodo;
      seleccionandoArista = false;
      esperandoConfirmacionPeso = true;
      modalPesoArista.show();
    }
  });

  confirmarPesoBtn.addEventListener("click", () => {
    const peso = parseFloat(pesoInput.value);
    
    if (isNaN(peso)) {
      mostrarError("Ingresá un peso válido");
      return;
    }
    
    try{
      grafo.agregarArista(nodoOrigen, nodoDestino, peso);
      manejadorGrafoVis.agregarArista({ from: nodoOrigen, to: nodoDestino, label: peso.toString() });
      mostrarExito(`Arista agregada correctamente`);
      esperandoConfirmacionPeso = false;
      modalPesoArista.hide();
      pesoInput.value = ""; 
      ocultarResultadoCamino();
    } catch (error) {
      mostrarError(error.message);
    }
  });

  document.getElementById("modalPesoArista").addEventListener('hidden.bs.modal', () => {
    if (esperandoConfirmacionPeso) {
        cancelarOperacion();
    }
  });

  document.addEventListener("click", (evento) => {
    if (seleccionandoArista){
      const contenedorGrafo = document.getElementById("contenedorGrafo");
      const esClickDentroDelContenedor = contenedorGrafo.contains(evento.target);
      const esBotonAgregarArista = evento.target.closest("#btnAgregarArista");

      if (!esClickDentroDelContenedor && !esBotonAgregarArista) {
        cancelarOperacion();
      }
    }
  });

  function cancelarOperacion() {
    mostrarError("Operación de agregar arista cancelada.");
    seleccionandoArista = false;
    esperandoConfirmacionPeso = false;
    nodoOrigen = null;
    nodoDestino = null;
    pesoInput.value = "";
  }
}

function validarGrafoValido(grafo) {
  if(grafo.cantidadVertices() < 2) {
    mostrarError("Debe haber al menos 2 nodos para agregar una arista");
    return false;
  }
  return true;
}

function validarNodoDestino(grafo, nodoOrigen, nodoDestino) {
  if (nodoDestino === nodoOrigen) {
    mostrarError("No podés seleccionar el mismo nodo como origen y destino. Seleccioná otro nodo.");
    return false;
  } 
  if(grafo.aristaExiste(nodoOrigen, nodoDestino)) {
    mostrarError("La arista ya existe. Seleccioná un nodo diferente.");
    return false;
  }
  return true;
}