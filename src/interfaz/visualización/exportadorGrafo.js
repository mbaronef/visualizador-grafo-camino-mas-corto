export class ExportadorGrafo {
  constructor(manejadorGrafo) {
    this.manejador = manejadorGrafo;
  }

  exportarJSON(nombreArchivo = 'grafo.json') {
    const datos = {
      nodos: this.manejador.nodos.get(),
      aristas: this.manejador.aristas.get()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(datos, null, 2));
    const enlace = document.createElement('a');
    enlace.href = dataStr;
    enlace.download = nombreArchivo;
    enlace.click();
  }

  exportarPNG(nombreArchivo = 'grafo.png') {
    const canvas = this.manejador.network.canvas.frame.canvas;
    const dataURL = canvas.toDataURL('image/png');

    const enlace = document.createElement('a');
    enlace.href = dataURL;
    enlace.download = nombreArchivo;
    enlace.click();
  }
}
