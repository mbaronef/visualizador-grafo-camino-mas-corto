export function inicializarEventoCentrarGrafo(manejadorGrafoVis) {
  const btnCentrarGrafo = document.getElementById("btnCentrarGrafo");

  btnCentrarGrafo.addEventListener("click", () => {
    manejadorGrafoVis.centrar();
  });
}