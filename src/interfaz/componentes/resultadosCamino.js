export function mostrarResultadoCamino({camino, costo}, grafo) {
  const divResultado = document.getElementById("resultadoCamino");

  if (esCaminoInvalido(camino, costo)) {
    divResultado.innerHTML=`
    <p><strong>No existe un camino entre el vértice de origen y el de destino.</strong></p>`;
  } else {
    const nombres = camino.map(id => grafo.obtenerVertice(id).nombre);
    const textoCamino = nombres.join(" ➜ ");
    
    divResultado.innerHTML = `
      <p><strong>Camino más corto de ${nombres[0]} a ${nombres[nombres.length - 1]}:&nbsp&nbsp</strong> ${textoCamino}</p>
      <p><strong>Costo total:&nbsp&nbsp</strong> ${costo}</p>`;
  }
  
  divResultado.classList.remove("d-none");
}

export function ocultarResultadoCamino() {
  const divResultado = document.getElementById("resultadoCamino");
  if (divResultado) {
    divResultado.classList.add("d-none");
    divResultado.innerHTML = "";
  }
}

function esCaminoInvalido(camino, costo) {
  return !camino || camino.length === 0 || costo === Infinity;
}