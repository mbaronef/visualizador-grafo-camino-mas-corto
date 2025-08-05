import {colores, opcionesVis} from './configVis.js';

export class ManejadorGrafoVis {
  constructor(idContenedor) {
    this.nodos = new vis.DataSet([]);
    this.aristas = new vis.DataSet([]);

    const container = document.getElementById(idContenedor);

    this.network = new vis.Network(container, { nodes: this.nodos, edges: this.aristas }, opcionesVis);
  }

  agregarNodo(nodo) {
    this.nodos.add(nodo);
    this.#resetearEstilos();
  }

  eliminarNodo(id) {
    this.nodos.remove({ id });
    this.aristas.remove(arista => arista.from === id || arista.to === id);
    this.#resetearEstilos();
  }

  agregarArista(arista) {
    this.aristas.add(arista);
    this.#resetearEstilos();
  }

  eliminarArista(origen, destino) {
    const idsAEliminar = this.#buscarAristasEntre(origen, destino).map(a => a.id);
    this.aristas.remove(idsAEliminar);
    this.#resetearEstilos();
  }

  vaciar() {
    this.nodos.clear();
    this.aristas.clear();
  }

  centrar() {
    this.network.fit({
      animation: {
        duration: 500,
        easingFunction: "easeInOutQuad"
      }
    });
  }

  onClickNodo(callback) {
    this.network.on("click", (params) => {
      if (params.nodes.length > 0) {
        callback(params.nodes[0]);
      }
    });
  }

  onClickArista(callback) {
    this.network.on("click", (params) => {
      if (params.edges.length > 0) {
        callback(params.edges[0]);
      }
    });
  }

  async resaltarCamino(camino) {
    this.#resetearEstilos();
    await this.#animarCamino(camino);
    this.#resetearEstilos();
    await this.#animarCamino([...camino].reverse());
  }

  async #animarCamino(camino) {
    const aristas = this.aristas.get();
    for (let i = 0; i < camino.length; i++) {
      const idNodo = camino[i];
      this.#actualizarColorNodo(idNodo, colores.colorNodoResaltado, colores.colorBordeResaltado);
      await this.#delay(300);

      if (i < camino.length - 1) {
        const origen = camino[i];
        const destino = camino[i + 1];
        const arista = aristas.find(a => this.#esAristaEntre(a, origen, destino));

        if (arista) {
          this.#actualizarColorArista(arista.id, colores.colorAristaResaltada, colores.anchoAristaResaltada);
          await this.#delay(300);
        }
      }
    }
  }

  #resetearEstilos() {
    this.nodos.forEach(nodo => {
      this.#actualizarColorNodo(nodo.id, colores.colorNodoPorDefecto, colores.colorBordePorDefecto);
    });

    this.aristas.forEach(arista => {
      this.#actualizarColorArista(arista.id, colores.colorAristaPorDefecto, colores.anchoAristaPorDefecto);
    });

    this.network.unselectAll();
  }

  #actualizarColorNodo(id, color, colorBorde){
    this.network.body.data.nodes.update({ id, color: { background: color, border: colorBorde }, borderWidth: 1.6 });
  }

  #actualizarColorArista(id, color, ancho) {
    this.network.body.data.edges.update({ id, color: { color }, width: ancho });
  }

  #buscarAristasEntre(origen, destino) {
    return this.aristas.get().filter(a => this.#esAristaEntre(a, origen, destino));
  }

  #esAristaEntre(arista, origen, destino) {
    return (arista.from === origen && arista.to === destino) || (arista.from === destino && arista.to === origen);
  }

  #delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
