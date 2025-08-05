import { ExportadorGrafo } from '../visualización/exportadorGrafo.js';

export function inicializarEventoExportarGrafo(manejadorGrafo) {
    const exportador = new ExportadorGrafo(manejadorGrafo);
    
    const btnExportar = document.getElementById('btnExportarGrafo');
    const modalExportarGrafo = new bootstrap.Modal(document.getElementById('modalExportarGrafo'));
    const btnExportarJSON = document.getElementById('btnExportarJSON');
    const btnExportarPNG = document.getElementById('btnExportarPNG');

    btnExportar.addEventListener('click', () => {
        modalExportarGrafo.show();
    });

    btnExportarJSON.addEventListener('click', () => {
        exportador.exportarJSON();
    });

    btnExportarPNG.addEventListener('click', () => {
        exportador.exportarPNG();
    });
}