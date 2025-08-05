export class ColaPrioridad {
  constructor(capacidadMaxima) {
    this.capacidad = capacidadMaxima;
    this.heap = [null];
    this.posiciones = new Map(); // vértice, pos. en heap
  }

  encolar(vertice, prioridad) {
    if (this.estaLlena()) return;

    if (!this.existe(vertice)) {
      const nodo = { vertice, prioridad };
      this.heap.push(nodo);
      let pos = this.heap.length - 1;
      this.posiciones.set(vertice, pos);
      this.#flotar(pos);
    } else {
      this.cambiarPrioridad(vertice, prioridad);
    }
  }

  desencolar() {
    if (this.esVacia()) return null;

    const raiz = this.heap[1].vertice;
    this.#intercambiar(1, this.heap.length - 1);
    this.heap.pop();
    this.posiciones.delete(raiz);

    if (!this.esVacia()) {
      this.#hundir(1);
    }
    return raiz;
  }

  cambiarPrioridad(vertice, nuevaPrioridad) {
    if (!this.existe(vertice)) return;

    const pos = this.posiciones.get(vertice);
    const nodo = this.heap[pos];

    if (nuevaPrioridad < nodo.prioridad) {
      nodo.prioridad = nuevaPrioridad;
      this.#flotar(pos);
    } else if (nuevaPrioridad > nodo.prioridad) {
      nodo.prioridad = nuevaPrioridad;
      this.#hundir(pos);
    }
  }

  obtenerPrioridad(vertice) {
    if (!this.existe(vertice)) return Infinity;
    return this.heap[this.posiciones.get(vertice)].prioridad;
  }

  existe(vertice) {
    return this.posiciones.has(vertice);
  }

  estaLlena() {
    return this.heap.length - 1 >= this.capacidad;
  }

  esVacia() {
    return this.heap.length === 1;
  }

  #padre(i) {
    return Math.floor(i / 2);
  }

  #hijoIzq(i) {
    return 2 * i;
  }

  #hijoDer(i) {
    return 2 * i + 1;
  }

  #comparar(padre, hijo) {
    const a = this.heap[padre];
    const b = this.heap[hijo];
    if (a.prioridad === b.prioridad) {
      return a.vertice < b.vertice;
    }
    return a.prioridad > b.prioridad;
  }

  #intercambiar(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    this.posiciones.set(this.heap[i].vertice, i);
    this.posiciones.set(this.heap[j].vertice, j);
  }

  #flotar(i) {
    if (i === 1) return;
    let padre = this.#padre(i);
    if (this.#comparar(padre, i)) {
      this.#intercambiar(padre, i);
      this.#flotar(padre);
    }
  }

  #hundir(i) {
    let izq = this.#hijoIzq(i);
    let der = this.#hijoDer(i);
    let menor = i;

    if (izq < this.heap.length && this.#comparar(menor, izq)) menor = izq;
    if (der < this.heap.length && this.#comparar(menor, der)) menor = der;

    if (menor !== i) {
      this.#intercambiar(i, menor);
      this.#hundir(menor);
    }
  }
}
