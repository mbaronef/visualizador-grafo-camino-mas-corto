import { ColaPrioridad } from '../dominio/colaPrioridad.js';

export class GestorDijkstra {
  constructor(grafo) {
    this.grafo = grafo;
    this.costos = null;
    this.vengoDe = null;
  }

  calcularCaminoMasCorto(idOrigen, idDestino) {
    this.#dijkstra(idOrigen);
    
    let camino = this.#reconstruirCamino(idOrigen, idDestino);
    let costo = this.costos.get(idDestino);
    return { camino, costo };
  }

  #dijkstra(idOrigen) {
    let visitados = this.#initVisitados();
    this.costos = this.#initCostos(idOrigen);
    this.vengoDe = this.#initVengoDe();

    let colaPrioridad = new ColaPrioridad(this.grafo.cantidadVertices());
    colaPrioridad.encolar(idOrigen, 0);

    while(!colaPrioridad.esVacia()){
        let verticeActual = colaPrioridad.desencolar();
        visitados.set(verticeActual, true);
        let adyacentes = this.grafo.obtenerAdyacentes(verticeActual);
        for (let arista of adyacentes) {
            let destino = arista.destino;
            let peso = arista.peso;
            if(this.costos.get(destino) > this.costos.get(verticeActual) + peso) {
                this.costos.set(destino, this.costos.get(verticeActual) + peso);
                this.vengoDe.set(destino, verticeActual);
                if (!visitados.get(destino)) {
                    colaPrioridad.encolar(destino, this.costos.get(destino));
                }
            }
        }
    }
  }
  
  #initVisitados() {
    let visitados = new Map();
    for (let id of this.grafo.vertices.keys()) {
      visitados.set(id, false);
    }
    return visitados;
  }

  #initCostos(idOrigen) {
    let costos = new Map();
    for (let id of this.grafo.vertices.keys()) {
      costos.set(id, Infinity);
    }
    costos.set(idOrigen, 0);
    return costos;
  }

  #initVengoDe() {
    let vengoDe = new Map();
    for (let id of this.grafo.vertices.keys()) {
      vengoDe.set(id, -1);
    }
    return vengoDe;
  }

  #reconstruirCamino(origen, destino) {
    const camino = [];
    let actual = destino;

    while (actual !== -1 && actual !== origen) {
      camino.unshift(actual);
      actual = this.vengoDe.get(actual);
    }
  
    if (actual === origen) {
      camino.unshift(origen);
    } else {
      return [];
    }
  
    return camino;
  }
}