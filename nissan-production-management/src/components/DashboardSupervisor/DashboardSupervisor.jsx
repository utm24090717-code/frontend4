import React from 'react';
import './DashboardSupervisor.css';

const DashboardSupervisor = () => {
  const parosData = [
    { causa: 'Falta material', frecuencia: 15, porcentaje: 30 },
    { causa: 'Falla eléctrica', frecuencia: 10, porcentaje: 20 },
    { causa: 'Error operario', frecuencia: 8, porcentaje: 16 },
    { causa: 'Mantenimiento', frecuencia: 7, porcentaje: 14 },
    { causa: 'Cambio modelo', frecuencia: 5, porcentaje: 10 },
    { causa: 'Otros', frecuencia: 5, porcentaje: 10 }
  ];

  const tendenciaOEE = [
    { mes: 'Ene', oee: 85 },
    { mes: 'Feb', oee: 87 },
    { mes: 'Mar', oee: 90 },
    { mes: 'Abr', oee: 92 },
    { mes: 'May', oee: 91 },
    { mes: 'Jun', oee: 96 }
  ];

  return (
    <div className="dashboard-supervisor">
      <div className="dashboard-header">
        <h1>SUPERVISOR – TURNO 2 (12:00-20:00)</h1>
        <div className="dashboard-subtitle">Fecha: {new Date().toLocaleDateString('es-ES')}</div>
      </div>

      <div className="kpi-cards">
        <div className="kpi-card">
          <div className="kpi-title">Cumplimiento de plan</div>
          <div className="kpi-value">96%</div>
          <div className="kpi-trend positive">↑ 2% vs ayer</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-title">Scrap acumulado</div>
          <div className="kpi-value">0.7%</div>
          <div className="kpi-sub">$4,380</div>
        </div>

        <div className="kpi-card critical">
          <div className="kpi-title">Paros mayores</div>
          <div className="kpi-value">2</div>
          <div className="kpi-sub">Robot 4, Prensa 7</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-title">Reconocimientos autónomas</div>
          <div className="kpi-value">4</div>
          <div className="kpi-sub">ejecutadas</div>
        </div>

        <div className="kpi-card warning">
          <div className="kpi-title">Aprobaciones pendientes</div>
          <div className="kpi-value">1</div>
          <div className="kpi-sub">requiere atención</div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Pareto - Causas de Paro/Scrap</h3>
          <div className="pareto-chart">
            <div className="pareto-bars">
              {parosData.map((item, index) => (
                <div key={index} className="pareto-bar-container">
                  <div className="pareto-bar-label">{item.causa}</div>
                  <div className="pareto-bar">
                    <div 
                      className="bar" 
                      style={{ height: `${item.frecuencia * 3}px` }}
                    ></div>
                  </div>
                  <div className="pareto-bar-value">{item.frecuencia}</div>
                </div>
              ))}
            </div>
            <div className="pareto-line">
              <div className="line-point" style={{ left: '20%', top: '30%' }}></div>
              <div className="line-point" style={{ left: '40%', top: '50%' }}></div>
              <div className="line-point" style={{ left: '60%', top: '66%' }}></div>
              <div className="line-point" style={{ left: '80%', top: '80%' }}></div>
              <div className="line-point" style={{ left: '100%', top: '100%' }}></div>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3>Tendencia OEE - Línea Ensamble</h3>
          <div className="line-chart">
            <div className="chart-grid">
              <div className="grid-line"></div>
              <div className="grid-line"></div>
              <div className="grid-line"></div>
            </div>
            <div className="data-line">
              {tendenciaOEE.map((item, index) => (
                <div key={index} className="data-point">
                  <div 
                    className="point" 
                    style={{ 
                      left: `${(index / (tendenciaOEE.length - 1)) * 100}%`,
                      bottom: `${(item.oee - 80) * 2}px`
                    }}
                  ></div>
                  <div className="point-label">{item.mes}</div>
                </div>
              ))}
            </div>
            <div className="chart-axis">
              <div className="axis-y">OEE %</div>
              <div className="axis-x">Mes</div>
            </div>
          </div>
        </div>
      </div>

      <div className="observations">
        <h4>Observaciones:</h4>
        <ul>
          <li>Los umbrales se recalibran trimestralmente según los resultados de los EQRs y los objetivos de SOCIO.</li>
          <li>Las acciones autónomas se ejecutan solo dentro de 45% de banda segura; fuera de ella requieren aprobación de supervisor (DQC-Man Rule).</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardSupervisor;