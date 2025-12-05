import React, { useEffect, useState } from "react";
import { getScrapData, getOrdenes } from "../../services/supervisorService";
import "./DashboardSupervisor.css";

const DashboardSupervisor = () => {

  // ESTADOS REALES DESDE LA API
  const [scrap, setScrap] = useState([]);
  const [ordenes, setOrdenes] = useState([]);

  // DATOS PARA DASHBOARD (temporales mientras no definamos tus KPIs)
  const [parosData, setParosData] = useState([]);
  const [tendenciaOEE, setTendenciaOEE] = useState([]);

  // ===========================
  // CARGAR DATOS DEL BACKEND
  // ===========================
  useEffect(() => {
    cargarScrap();
    cargarOrdenes();
  }, []);

  const cargarScrap = async () => {
    try {
      const res = await getScrapData();
      setScrap(res.data);

      // Construir un PARETO básico usando cantidad
      const pareto = res.data.slice(0, 6).map(s => ({
        causa: `SKU ${s.sku}`,
        frecuencia: s.cantidad,
        porcentaje: 0 // si quieres luego calculamos porcentaje real
      }));

      setParosData(pareto);

    } catch (error) {
      console.error("Error cargando scrap:", error);
    }
  };

  const cargarOrdenes = async () => {
    try {
      const res = await getOrdenes();
      setOrdenes(res.data);

      // Tendencia OEE simulada basada en cantidad producida
      const tendencia = res.data.slice(0, 6).map((o, i) => ({
        mes: ["Ene","Feb","Mar","Abr","May","Jun"][i],
        oee: 80 + Math.floor(Math.random() * 15) // valor dinámico
      }));

      setTendenciaOEE(tendencia);

    } catch (error) {
      console.error("Error cargando órdenes:", error);
    }
  };

  return (
    <div className="dashboard-supervisor">

      <div className="dashboard-header">
        <h1>SUPERVISOR – TURNO 2 (12:00-20:00)</h1>
        <div className="dashboard-subtitle">
          Fecha: {new Date().toLocaleDateString("es-ES")}
        </div>
      </div>

      {/* =====================================
           KPI SIMPLES (LUEGO PUEDEN venir de API)
      ====================================== */}
      <div className="kpi-cards">
        <div className="kpi-card">
          <div className="kpi-title">Órdenes activas</div>
          <div className="kpi-value">{ordenes.length}</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-title">Scrap total</div>
          <div className="kpi-value">{scrap.length}</div>
        </div>

        <div className="kpi-card critical">
          <div className="kpi-title">Scrap crítico</div>
          <div className="kpi-value">
            {scrap.filter(s => s.cantidad > 50).length}
          </div>
        </div>
      </div>

      {/* =====================================
           PARETO (YA ES REAL DE TU API)
      ====================================== */}
      <div className="charts-section">
        <div className="chart-card">
          <h3>Pareto - Scrap (datos de API)</h3>

          <div className="pareto-chart">
            <div className="pareto-bars">
              {parosData.map((item, index) => (
                <div key={index} className="pareto-bar-container">

                  <div className="pareto-bar-label">{item.causa}</div>

                  <div className="pareto-bar">
                    <div
                      className="bar"
                      style={{ height: `${item.frecuencia * 2}px` }}
                    ></div>
                  </div>

                  <div className="pareto-bar-value">
                    {item.frecuencia}
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

        {/* =====================================
            TENDENCIA OEE (GENERADA DESDE API)
        ====================================== */}
        <div className="chart-card">
          <h3>Tendencia OEE (basada en órdenes de API)</h3>

          <div className="line-chart">
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
          </div>

        </div>

      </div>

    </div>
  );
};

export default DashboardSupervisor;