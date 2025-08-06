import { Vertice } from './vertice.js';
import { Arista } from './arista.js';

export class Grafo {
  constructor() {
    this.vertices = new Map();    // id, Nodo
    this.adyacentes = new Map();  // id, [Arista]
    this.proximoId = 1;
}

  agregarVertice(nombre) {
    let id = this.proximoId++;
    let vertice = new Vertice(id, nombre);
    this.vertices.set(id, vertice);
    this.adyacentes.set(id, []);
    return id;
  }

  eliminarVertice(id) {
    this.vertices.delete(id);
    this.adyacentes.delete(id);
    for (let [idVertice, lista] of this.adyacentes) {
      this.adyacentes.set(idVertice, lista.filter(a => a.destino !== id));
    }
  }

  agregarArista(idOrigen, idDestino, peso) {
    this.#validarNodosExistentes(idOrigen, idDestino);
    this.#validarOrigenDistintoDestino(idOrigen, idDestino);
    this.#validarPesoPositivo(peso);
    this.#validarAristaNoExistente(idOrigen, idDestino);

    this.adyacentes.get(idOrigen).push(new Arista(idDestino, peso));
    this.adyacentes.get(idDestino).push(new Arista(idOrigen, peso)); 
  }

  eliminarArista(idOrigen, idDestino) {
    this.#validarNodosExistentes(idOrigen, idDestino);
    this.#validarAristaExistente(idOrigen, idDestino);

    this.adyacentes.set(idOrigen, this.adyacentes.get(idOrigen).filter(arista => arista.destino !== idDestino));
    this.adyacentes.set(idDestino, this.adyacentes.get(idDestino).filter(arista => arista.destino !== idOrigen));
  }

  obtenerVertice(id) {
    return this.vertices.get(id);
  }

  obtenerAdyacentes(id) {
    return this.adyacentes.get(id);
  }

  cantidadVertices() {
    return this.vertices.size;
  }

  hayAristas() {
    for (let listaAristas of this.adyacentes.values()) {
      if (listaAristas.length > 0) return true;
    }
    return false;
  }
  
  aristaExiste(idOrigen, idDestino) {
    if (!this.hayAristas()) return false;
    if (!this.adyacentes.has(idOrigen)) return false;
    return this.adyacentes.get(idOrigen).some(arista => arista.destino === idDestino);
  }

  estaVacio() {
    return this.cantidadVertices() === 0 && this.proximoId === 1;
  }

  vaciar(){
    this.vertices.clear();
    this.adyacentes.clear();
    this.proximoId = 1;
  }

  #validarNodosExistentes(idOrigen, idDestino) {
    if (!this.adyacentes.has(idOrigen) || !this.adyacentes.has(idDestino)) throw new Error("Uno de los nodos no existe.");
  }

  #validarPesoPositivo(peso) {
    if (peso < 0) throw new Error("El peso de la arista debe ser positivo.");
  }

  #validarOrigenDistintoDestino(idOrigen, idDestino) {
    if (idOrigen === idDestino) throw new Error("El vértice origen y el vértice destino deben ser distintos.");
  }

  #validarAristaNoExistente(idOrigen, idDestino) {
    if (this.aristaExiste(idOrigen, idDestino)) {
      throw new Error("La arista ya existe.");
    }
  }

  #validarAristaExistente(idOrigen, idDestino) {
    if (!this.aristaExiste(idOrigen, idDestino)) {
      throw new Error("La arista no existe.");
    }
  }
}