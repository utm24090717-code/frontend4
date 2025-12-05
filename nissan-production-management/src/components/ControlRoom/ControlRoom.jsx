import React, { useState, useEffect } from "react";
import "./ControlRoom.css";

// IMPORTAMOS EL SERVICIO DE TU API REAL
import {
  getOrdenes,
  crearOrden,
  actualizarOrden,
  eliminarOrden,
} from "../../services/produccionService";

const ControlRoom = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);

  // FORMULARIO SOLO USA LOS CAMPOS QUE EXISTEN EN TU API
  const [formData, setFormData] = useState({
    Codigo: "",
    Descripcion: "",
    Estado: "Pendiente",
  });

  // ================================
  // CARGAR ÓRDENES DESDE LA API
  // ================================
  const cargarOrdenes = async () => {
    try {
      const res = await getOrdenes();
      setOrders(res.data);
    } catch (error) {
      console.error("Error al obtener órdenes:", error);
    }
  };

  useEffect(() => {
    cargarOrdenes();
  }, []);

  // ================================
  // CREAR ORDEN
  // ================================
  const handleCreate = async () => {
    if (!formData.Codigo || !formData.Descripcion) {
      alert("Código y Descripción son obligatorios");
      return;
    }

    try {
      const res = await crearOrden(formData);

      alert("Orden creada. ID: " + res.data.id);

      await cargarOrdenes();
      resetForm();

    } catch (error) {
      console.error(error);
      alert("Error al crear la orden");
    }
  };

  // ================================
  // EDITAR ORDEN (cargar datos al formulario)
  // ================================
  const handleEdit = (orden) => {
    setEditingOrder(orden);
    setFormData({
      Codigo: orden.codigo,
      Descripcion: orden.descripcion,
      Estado: orden.estado,
    });

    // Scroll al formulario
    setTimeout(() => {
      document.querySelector(".order-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  // ================================
  // ACTUALIZAR ORDEN
  // ================================
  const handleUpdate = async () => {
    if (!editingOrder) return;

    try {
      await actualizarOrden(editingOrder.id, formData);

      alert("Orden actualizada correctamente");

      await cargarOrdenes();
      resetForm();

    } catch (error) {
      console.error(error);
      alert("Error al actualizar la orden");
    }
  };

  // ================================
  // ELIMINAR ORDEN
  // ================================
  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta orden?")) return;

    try {
      await eliminarOrden(id);
      alert("Orden eliminada");

      await cargarOrdenes();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar la orden");
    }
  };

  // ================================
  // LIMPIAR FORMULARIO
  // ================================
  const resetForm = () => {
    setFormData({
      Codigo: "",
      Descripcion: "",
      Estado: "Pendiente",
    });

    setEditingOrder(null);
  };

  return (
    <div className="control-room">
      <h1>Sala de Control — Producción</h1>
      <p className="subtitle">Gestión de órdenes de producción conectada a tu API</p>

      {/* FORMULARIO */}
      <div className="dashboard-card">
        <div className="section-header">
          <h2>{editingOrder ? "✏ Editar Orden" : "➕ Nueva Orden"}</h2>

          {editingOrder && (
            <button className="btn-cancel" onClick={resetForm}>
              Cancelar edición
            </button>
          )}
        </div>

        <form
          className="order-form"
          onSubmit={(e) => {
            e.preventDefault();
            editingOrder ? handleUpdate() : handleCreate();
          }}
        >
          <div className="form-row">
            <div className="form-group">
              <label>Código *</label>
              <input
                type="text"
                value={formData.Codigo}
                onChange={(e) =>
                  setFormData({ ...formData, Codigo: e.target.value })
                }
                placeholder="Ej: ORD-001"
                required
              />
            </div>

            <div className="form-group">
              <label>Descripción *</label>
              <input
                type="text"
                value={formData.Descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, Descripcion: e.target.value })
                }
                placeholder="Ej: Ensamble Nissan Versa"
                required
              />
            </div>

            <div className="form-group">
              <label>Estado</label>
              <select
                value={formData.Estado}
                onChange={(e) =>
                  setFormData({ ...formData, Estado: e.target.value })
                }
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Completada">Completada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn-nissan submit-btn">
            {editingOrder ? "Actualizar Orden" : "Agregar Orden"}
          </button>

          <button type="button" className="btn-reset" onClick={resetForm}>
            Limpiar
          </button>
        </form>
      </div>

      {/* TABLA DE ÓRDENES */}
      <div className="dashboard-card">
        <div className="section-header">
          <h2>📋 Órdenes de Producción</h2>
          <span className="order-count">{orders.length} órdenes</span>
        </div>

        {orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No hay órdenes registradas</h3>
            <p>Crea una nueva orden usando el formulario</p>
          </div>
        ) : (
          <table className="nissan-table orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Código</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>{o.codigo}</td>
                  <td>{o.descripcion}</td>
                  <td>{o.estado}</td>
                  <td>
                    <button className="btn-action btn-edit" onClick={() => handleEdit(o)}>
                      ✏ Editar
                    </button>

                    <button
                      className="btn-action btn-delete"
                      onClick={() => handleDelete(o.id)}
                    >
                      🗑 Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ControlRoom;