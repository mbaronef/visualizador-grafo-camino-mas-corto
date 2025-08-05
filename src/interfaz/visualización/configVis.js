export const colores = {
    colorNodoPorDefecto: '#334155',
    colorBordePorDefecto: '#475569',
    colorAristaPorDefecto: '#64748b',
    anchoAristaPorDefecto: 2,

    colorNodoResaltado: '#6366f1',
    colorBordeResaltado: '#818cf8',
    colorAristaResaltada: '#6365f1cd',
    anchoAristaResaltada: 4
};

export const opcionesVis = {
  physics: {
    enabled: true,
    stabilization: {
      enabled: true,
      iterations: 150,
      updateInterval: 25,
      fit: true
    },
    barnesHut: {
      gravitationalConstant: -1000, 
      centralGravity: 0.1,          
      springLength: 100,             
      springConstant: 0.005,         
      damping: 0.3                   
    },
    maxVelocity: 2                   
  },
  interaction: {
    hover: true
  },
  edges: {
    font: { align: 'middle' },
    color: { highlight: '#a5b4fc',  hover: '#a5b4fc'  }  
  },
  nodes: {
    shape: 'circle',
    font: { color: '#ffffff', align: 'middle' },
    color: {
      highlight: {
        background: '#475569',      
        border: '#6366f1'           
      },
      hover: {
        background: '#3b475f',      
        border: '#818cf8'
      }
    }
  },
};