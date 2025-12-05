// src/components/DashboardFinance/DashboardFinance.jsx
import './DashboardFinance.css';

const DashboardFinance = () => {
  const financialData = [
    { line: 'Ensamble', cost: 42500 },
    { line: 'Pintura', cost: 21800 },
    { line: 'Estampado', cost: 15600 },
    { line: 'Maquinado', cost: 18900 },
    { line: 'Logística', cost: 11200 }
  ];

  const copdDistribution = [
    { category: 'Energía', percentage: 35, color: '#c3002f' },
    { category: 'Materiales', percentage: 25, color: '#0066b1' },
    { category: 'Mano de obra', percentage: 20, color: '#00a651' },
    { category: 'Mantenimiento', percentage: 15, color: '#ff9900' },
    { category: 'Otros', percentage: 5, color: '#666666' }
  ];

  const quarterlyTrend = [
    { quarter: 'Q1', roi: 18 },
    { quarter: 'Q2', roi: 21 },
    { quarter: 'Q3', roi: 23 },
    { quarter: 'Q4', roi: 25 }
  ];

  return (
    <div className="dashboard-finance">
      <div className="dashboard-header">
        <h1>Dashboard de Finanzas</h1>
        <div className="dashboard-subtitle">FINANZAS – ANÁLISIS DE COSTOS</div>
      </div>

      <div className="financial-kpis">
        <div className="kpi-row">
          <div className="kpi-card financial">
            <div className="kpi-label">Costo Unidad Promedio</div>
            <div className="kpi-value">$142.50</div>
          </div>
          <div className="kpi-card financial">
            <div className="kpi-label">COPD</div>
            <div className="kpi-value">$8,324/mes</div>
            <div className="kpi-sub">(15% sobre ventas)</div>
          </div>
        </div>
        
        <div className="kpi-row">
          <div className="kpi-card financial">
            <div className="kpi-label">Varianza Energía</div>
            <div className="kpi-value negative">-3.1%</div>
            <div className="kpi-sub">vs presupuesto</div>
          </div>
          <div className="kpi-card financial">
            <div className="kpi-label">ROI Iniciativas</div>
            <div className="kpi-value positive">23%</div>
            <div className="kpi-sub">Activas</div>
          </div>
        </div>

        <div className="kpi-card large financial">
          <div className="kpi-label">NOCADO Capital</div>
          <div className="kpi-value">$1.2M</div>
          <div className="kpi-sub">(15% del total)</div>
          <div className="kpi-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '15%' }}></div>
            </div>
            <div className="progress-label">15% utilizado</div>
          </div>
        </div>
      </div>

      <div className="financial-charts">
        <div className="chart-section">
          <div className="dashboard-card">
            <h3>Costos por Línea de Producción</h3>
            <div className="costs-chart">
              {financialData.map((item, index) => (
                <div key={index} className="cost-bar">
                  <div className="bar-label">{item.line}</div>
                  <div className="bar-container">
                    <div 
                      className="bar-fill" 
                      style={{ 
                        width: `${(item.cost / 50000) * 100}%`,
                        backgroundColor: index === 0 ? '#c3002f' : 
                                       index === 1 ? '#0066b1' : 
                                       index === 2 ? '#00a651' : 
                                       index === 3 ? '#ff9900' : '#666666'
                      }}
                    ></div>
                  </div>
                  <div className="bar-value">${item.cost.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-section">
          <div className="dashboard-card">
            <h3>Distribución COPD</h3>
            <div className="donut-chart">
              <div className="donut-container">
                <div className="donut-ring">
                  {copdDistribution.map((item, index) => {
                    const startAngle = index === 0 ? 0 : 
                      copdDistribution.slice(0, index).reduce((acc, curr) => acc + curr.percentage, 0) * 3.6;
                    
                    return (
                      <div 
                        key={index}
                        className="donut-segment"
                        style={{
                          '--start': `${startAngle}deg`,
                          '--percentage': `${item.percentage * 3.6}deg`,
                          '--color': item.color
                        }}
                      ></div>
                    );
                  })}
                </div>
                <div className="donut-center">
                  <div className="donut-total">COPD</div>
                  <div className="donut-percentage">100%</div>
                </div>
              </div>
              <div className="donut-legend">
                {copdDistribution.map((item, index) => (
                  <div key={index} className="legend-item">
                    <span 
                      className="legend-color" 
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="legend-label">{item.category}</span>
                    <span className="legend-value">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="trend-section">
        <div className="dashboard-card">
          <h3>Tendencia ROI Trimestral</h3>
          <div className="roi-trend">
            <div className="trend-chart">
              {quarterlyTrend.map((item, index) => (
                <div key={index} className="trend-column">
                  <div 
                    className="column-fill"
                    style={{ 
                      height: `${(item.roi / 30) * 100}%`,
                      backgroundColor: item.roi >= 20 ? '#00a651' : '#ff9900'
                    }}
                  ></div>
                  <div className="column-label">{item.quarter}</div>
                  <div className="column-value">{item.roi}%</div>
                </div>
              ))}
            </div>
            <div className="trend-info">
              <div className="trend-item positive">
                <span className="trend-arrow">↑</span>
                <span>Objetivo cumplido: 20%</span>
              </div>
              <div className="trend-item">
                <span>Proyección Q1 2024: 27%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="financial-summary">
        <div className="dashboard-card">
          <h3>Resumen Financiero</h3>
          <div className="summary-content">
            <div className="summary-item">
              <div className="summary-label">Margen Bruto</div>
              <div className="summary-value positive">32.5%</div>
            </div>
            <div className="summary-item">
              <div className="summary-label">Eficiencia Costos</div>
              <div className="summary-value positive">+4.2%</div>
            </div>
            <div className="summary-item">
              <div className="summary-label">ROI Total</div>
              <div className="summary-value positive">18.7%</div>
            </div>
            <div className="summary-item">
              <div className="summary-label">Retorno Capital</div>
              <div className="summary-value">15.3%</div>
            </div>
          </div>
          <div className="summary-note">
            <p><strong>Nota:</strong> Los indicadores muestran mejora continua. Se recomienda mantener la inversión en eficiencia energética.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardFinance;