import './DashboardMaintenance.css';

const DashboardMaintenance = () => {
  const assets = [
    { id: 1, name: 'Robot Ensamblaje', condition: 'Óptima', mttr: '2h', mtbf: '120h', status: 'green' },
    { id: 2, name: 'Prensa Hidráulica', condition: 'Crítica', mttr: '8h', mtbf: '48h', status: 'red' },
    { id: 3, name: 'Banda Transportadora', condition: 'Buena', mttr: '4h', mtbf: '96h', status: 'green' },
    { id: 4, name: 'Máquina CNC', condition: 'Alerta', mttr: '6h', mtbf: '72h', status: 'amber' },
    { id: 5, name: 'Sistema Pintura', condition: 'Buena', mttr: '3h', mtbf: '110h', status: 'green' }
  ];

  const maintenanceMetrics = [
    { label: 'MTTR Promedio', value: '46h' },
    { label: 'MTBF', value: '14 min' },
    { label: 'Órdenes Críticas', value: '5' },
    { label: 'Backlog', value: '12' }
  ];

  return (
    <div className="dashboard-maintenance">

      {/* HEADER */}
      <div className="dashboard-header">
        <h1>Dashboard de Mantenimiento</h1>
        <div className="dashboard-subtitle">SALUD DE ACTIVOS – MANTENIMIENTO</div>
      </div>

      {/* MÉTRICAS */}
      <div className="metrics-grid">
        {maintenanceMetrics.map((metric, index) => (
          <div className="metric-card" key={index}>
            <div className="metric-label">{metric.label}</div>
            <div className="metric-value">{metric.value}</div>
          </div>
        ))}
      </div>

      <div className="maintenance-content">

        {/* TABLA DE ACTIVOS */}
        <div className="assets-section">
          <div className="dashboard-card">
            <h2>Estado de Activos Críticos</h2>

            <table className="nissan-table">
              <thead>
                <tr>
                  <th>Activo</th>
                  <th>Condición</th>
                  <th>MTTR</th>
                  <th>MTBF</th>
                  <th>Estado</th>
                </tr>
              </thead>

              <tbody>
                {assets.map((asset) => (
                  <tr key={asset.id}>
                    <td><strong>{asset.name}</strong></td>
                    <td>{asset.condition}</td>
                    <td>{asset.mttr}</td>
                    <td>{asset.mtbf}</td>
                    <td>
                      <span className={`status-indicator status-${asset.status}`}></span>
                      {asset.status === 'green' ? 'Óptimo' :
                       asset.status === 'amber' ? 'Alerta' :
                       'Crítico'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CHARTS */}
        <div className="charts-section">

          {/* PREDICTIVO */}
          <div className="dashboard-card">
            <h3>Predictivo (RULC/D)</h3>

            <div className="predictive-chart">
              <div className="predictive-item">
                <div className="predictive-label">Robot 4</div>
                <div className="predictive-bar">
                  <div className="predictive-fill" style={{ width: "85%" }}></div>
                </div>
                <div className="predictive-value">85% vida útil</div>
              </div>

              <div className="predictive-item">
                <div className="predictive-label">Prensa 7</div>
                <div className="predictive-bar">
                  <div className="predictive-fill critical" style={{ width: "30%" }}></div>
                </div>
                <div className="predictive-value">30% vida útil</div>
              </div>

              <div className="predictive-item">
                <div className="predictive-label">CNC 2</div>
                <div className="predictive-bar">
                  <div className="predictive-fill" style={{ width: "65%" }}></div>
                </div>
                <div className="predictive-value">65% vida útil</div>
              </div>
            </div>

            <div className="predictive-info">
              <p><strong>3 equipos</strong> requieren atención predictiva</p>
            </div>
          </div>

          {/* PM CHART */}
          <div className="dashboard-card">
            <h3>% Cumplimiento Plan PM</h3>

            <div className="pm-chart">
              <div className="pm-month">
                <div className="pm-label">Ene</div>
                <div className="pm-bar">
                  <div className="pm-fill" style={{ height: "85%" }}></div>
                </div>
                <div className="pm-value">85%</div>
              </div>

              <div className="pm-month">
                <div className="pm-label">Feb</div>
                <div className="pm-bar">
                  <div className="pm-fill" style={{ height: "92%" }}></div>
                </div>
                <div className="pm-value">92%</div>
              </div>

              <div className="pm-month">
                <div className="pm-label">Mar</div>
                <div className="pm-bar">
                  <div className="pm-fill" style={{ height: "78%" }}></div>
                </div>
                <div className="pm-value">78%</div>
              </div>

              <div className="pm-month">
                <div className="pm-label">Abr</div>
                <div className="pm-bar">
                  <div className="pm-fill" style={{ height: "95%" }}></div>
                </div>
                <div className="pm-value">95%</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SCATTER PLOT */}
      <div className="correlation-section">
        <div className="dashboard-card">
          <h3>Correlación Vibración-Temperatura</h3>

          <div className="scatter-plot">
            <div className="plot-grid">
              <div className="grid-line"></div>
              <div className="grid-line"></div>
              <div className="grid-line"></div>
            </div>

            <div className="plot-points">
              <div className="point normal" style={{ left: "20%", top: "30%" }}></div>
              <div className="point alert" style={{ left: "40%", top: "50%" }}></div>
              <div className="point critical" style={{ left: "70%", top: "80%" }}></div>
              <div className="point normal" style={{ left: "25%", top: "35%" }}></div>
              <div className="point normal" style={{ left: "30%", top: "40%" }}></div>
            </div>

            <div className="plot-axes">
              <div className="axis-x">Temperatura (°C)</div>
              <div className="axis-y">Vibración (mm/s)</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardMaintenance;