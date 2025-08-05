import { Grafo } from '../dominio/grafo.js';
import { ManejadorGrafoVis } from './visualización/manejadorGrafoVis.js';

import { inicializarEventoAgregarVertice } from './eventos/agregarVertice.js';
import { inicializarEventoEliminarVertice } from './eventos/eliminarVertice.js';
import { inicializarEventoAgregarArista } from './eventos/agregarArista.js';
import { inicializarEventoEliminarArista } from './eventos/eliminarArista.js';
import { inicializarEventoEliminarGrafo } from './eventos/eliminarGrafo.js';
import { inicializarEventoCalcularCaminoMasCorto } from './eventos/calcularCaminoMasCorto.js';
import { inicializarEventoCentrarGrafo } from './eventos/centrarGrafo.js';
import { inicializarEventoExportarGrafo } from './eventos/exportarGrafo.js';

const grafo = new Grafo();
const manejadorGrafoVis = new ManejadorGrafoVis('contenedorGrafo');

//Agregar vértice
inicializarEventoAgregarVertice(grafo, manejadorGrafoVis);

// Eliminar vértice
inicializarEventoEliminarVertice(grafo, manejadorGrafoVis);

// Agregar arista
inicializarEventoAgregarArista(grafo, manejadorGrafoVis);

// Eliminar arista
inicializarEventoEliminarArista(grafo, manejadorGrafoVis);

// Eliminar grafo
inicializarEventoEliminarGrafo(grafo, manejadorGrafoVis);

// Calcular camino más corto
inicializarEventoCalcularCaminoMasCorto(grafo, manejadorGrafoVis);

// Centrar grafo
inicializarEventoCentrarGrafo(manejadorGrafoVis);

// Exportar grafo
inicializarEventoExportarGrafo(manejadorGrafoVis);