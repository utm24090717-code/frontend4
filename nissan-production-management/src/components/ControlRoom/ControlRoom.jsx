// src/components/ControlRoom/ControlRoom.jsx
import React, { useState, useEffect } from 'react';
import './ControlRoom.css';

const ControlRoom = () => {
  // Estados para las órdenes y formulario
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    id: '',
    fecha: '',
    linea: '',
    cantidadPlaneada: '',
    cantidadProducida: '',
    estado: 'Pendiente',
    responsable: ''
  });
  const [editingIndex, setEditingIndex] = useState(null);

  // PASO 1.1: Cargar órdenes guardadas al iniciar
  useEffect(() => {
    const savedOrders = localStorage.getItem('nissan_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // PASO 1.2: Guardar órdenes cuando cambien
  useEffect(() => {
    localStorage.setItem('nissan_orders', JSON.stringify(orders));
  }, [orders]);

  // PASO 1.3: Datos de líneas de producción (fijos)
  const productionLines = [
    { linea: 'Ensamble', oee: 87, qyk: '475/455', real: 51240, socap: 0, status: 'green' },
    { linea: 'Pintura', oee: 86, qyk: '118/1208', real: 5980, socap: 0, status: 'amber' },
    { linea: 'Estampado', oee: 91, qyk: '11.85/125', real: 5560, socap: 0, status: 'green' },
    { linea: 'Maquinado', oee: 86, qyk: '615/605', real: 5720, socap: 0, status: 'red' },
    { linea: 'Logística', oee: 89, qyk: 'OK', real: 5220, socap: 0, status: 'green' }
  ];

  // PASO 1.4: Función para agregar una nueva orden
  const handleAddOrder = () => {
    if (!newOrder.id || !newOrder.linea || !newOrder.fecha) {
      alert('Por favor completa los campos obligatorios: ID, Fecha y Línea');
      return;
    }

    // Verificar si el ID ya existe
    if (orders.some(order => order.id === newOrder.id)) {
      alert('El ID de orden ya existe. Usa un ID único.');
      return;
    }

    const orderToAdd = {
      ...newOrder,
      id: newOrder.id,
      cantidadPlaneada: newOrder.cantidadPlaneada || '0',
      cantidadProducida: newOrder.cantidadProducida || '0',
      responsable: newOrder.responsable || 'Sin asignar'
    };

    setOrders([...orders, orderToAdd]);
    resetForm();
    alert('Orden agregada correctamente');
  };

  // PASO 1.5: Función para eliminar una orden
  const handleDeleteOrder = (index) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta orden?')) {
      const newOrders = [...orders];
      const deletedOrder = newOrders[index];
      newOrders.splice(index, 1);
      setOrders(newOrders);
      alert(`Orden "${deletedOrder.id}" eliminada correctamente`);
    }
  };

  // PASO 1.6: Función para editar una orden
  const handleEditOrder = (index) => {
    const orderToEdit = orders[index];
    setNewOrder(orderToEdit);
    setEditingIndex(index);
    
    // Desplazar hacia el formulario
    setTimeout(() => {
      document.querySelector('.order-form')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  };

  // PASO 1.7: Función para actualizar una orden
  const handleUpdateOrder = () => {
    if (editingIndex === null) return;

    if (!newOrder.id || !newOrder.linea || !newOrder.fecha) {
      alert('Por favor completa los campos obligatorios: ID, Fecha y Línea');
      return;
    }

    const updatedOrders = [...orders];
    updatedOrders[editingIndex] = newOrder;
    setOrders(updatedOrders);
    resetForm();
    alert('Orden actualizada correctamente');
  };

  // PASO 1.8: Función para cancelar edición
  const handleCancelEdit = () => {
    resetForm();
  };

  // PASO 1.9: Función para resetear el formulario
  const resetForm = () => {
    setNewOrder({
      id: '',
      fecha: '',
      linea: '',
      cantidadPlaneada: '',
      cantidadProducida: '',
      estado: 'Pendiente',
      responsable: ''
    });
    setEditingIndex(null);
  };

  // PASO 1.10: Función para manejar el submit del formulario
  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      handleUpdateOrder();
    } else {
      handleAddOrder();
    }
  };

  // PASO 1.11: Función para obtener el color del estado
  const getStatusColor = (estado) => {
    switch(estado.toLowerCase()) {
      case 'pendiente': return '#ff9900';
      case 'en proceso': return '#0066b1';
      case 'completada': return '#00a651';
      case 'cancelada': return '#c3002f';
      default: return '#666666';
    }
  };

  // PASO 1.12: Función para formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return 'No definida';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  return (
    <div className="control-room">
      {/* PASO 1.13: Header del Control Room */}
      <div className="control-room-header">
        <div>
          <h1>Sala de Control — Producción</h1>
          <p className="subtitle">Gestión de líneas y órdenes de producción</p>
        </div>
        <div className="status-summary">
          <span className="status-item">
            <span className="status-indicator status-red"></span>
            Paros Críticos: 3
          </span>
          <span className="status-item">
            <span className="status-indicator status-amber"></span>
            Alertas: 5
          </span>
          <span className="status-item">
            <span className="status-indicator status-green"></span>
            Normal: 18
          </span>
        </div>
      </div>

      {/* PASO 1.14: Tabla de líneas de producción */}
      <div className="dashboard-card">
        <div className="section-header">
          <h2>Estado de Líneas de Producción</h2>
          <span className="last-update">Actualizado: {new Date().toLocaleTimeString()}</span>
        </div>
        <table className="nissan-table">
          <thead>
            <tr>
              <th>Línea</th>
              <th>OEE</th>
              <th>Q&K vs Real</th>
              <th>Producción $/h</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {productionLines.map((line, index) => (
              <tr key={index}>
                <td><strong>{line.linea}</strong></td>
                <td>
                  <div className="oee-container">
                    <span className="oee-value">{line.oee}%</span>
                    <div className="oee-bar">
                      <div 
                        className="oee-fill" 
                        style={{ width: `${line.oee}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>{line.qyk}</td>
                <td>${line.real.toLocaleString()}</td>
                <td>
                  <span className={`status-indicator status-${line.status}`}></span>
                  <span className={`status-text status-${line.status}`}>
                    {line.status === 'green' ? 'Normal' : 
                     line.status === 'amber' ? 'Alerta' : 'Crítico'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PASO 1.15: Gestión de órdenes */}
      <div className="orders-section">
        {/* Formulario de nueva/editar orden */}
        <div className="dashboard-card">
          <div className="section-header">
            <h2>{editingIndex !== null ? '✏️ Editar Orden' : '➕ Nueva Orden'}</h2>
            {editingIndex !== null && (
              <button 
                onClick={handleCancelEdit}
                className="btn-cancel"
              >
                Cancelar Edición
              </button>
            )}
          </div>
          
          <form onSubmit={handleSubmitOrder} className="order-form">
            <div className="form-row">
              <div className="form-group">
                <label>
                  ID de Orden *
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={newOrder.id}
                  onChange={(e) => setNewOrder({...newOrder, id: e.target.value})}
                  placeholder="Ej: ORD-001"
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  Fecha *
                  <span className="required">*</span>
                </label>
                <input
                  type="date"
                  value={newOrder.fecha}
                  onChange={(e) => setNewOrder({...newOrder, fecha: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  Línea *
                  <span className="required">*</span>
                </label>
                <select
                  value={newOrder.linea}
                  onChange={(e) => setNewOrder({...newOrder, linea: e.target.value})}
                  required
                >
                  <option value="">Seleccionar línea</option>
                  <option value="Ensamble">Ensamble</option>
                  <option value="Pintura">Pintura</option>
                  <option value="Estampado">Estampado</option>
                  <option value="Maquinado">Maquinado</option>
                  <option value="Logística">Logística</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Cantidad Planeada</label>
                <input
                  type="number"
                  value={newOrder.cantidadPlaneada}
                  onChange={(e) => setNewOrder({...newOrder, cantidadPlaneada: e.target.value})}
                  placeholder="Ej: 1000"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Cantidad Producida</label>
                <input
                  type="number"
                  value={newOrder.cantidadProducida}
                  onChange={(e) => setNewOrder({...newOrder, cantidadProducida: e.target.value})}
                  placeholder="Ej: 950"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Responsable</label>
                <input
                  type="text"
                  value={newOrder.responsable}
                  onChange={(e) => setNewOrder({...newOrder, responsable: e.target.value})}
                  placeholder="Nombre del responsable"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Estado</label>
                <select
                  value={newOrder.estado}
                  onChange={(e) => setNewOrder({...newOrder, estado: e.target.value})}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Completada">Completada</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-nissan submit-btn">
                {editingIndex !== null ? 'Actualizar Orden' : 'Agregar Orden'}
              </button>
              
              <button 
                type="button" 
                onClick={resetForm}
                className="btn-reset"
              >
                Limpiar Formulario
              </button>
            </div>

            <div className="form-info">
              <p><span className="required">*</span> Campos obligatorios</p>
              <p>Total de órdenes en sistema: <strong>{orders.length}</strong></p>
            </div>
          </form>
        </div>

        {/* PASO 1.16: Lista de órdenes */}
        <div className="dashboard-card">
          <div className="section-header">
            <h2>📋 Órdenes de Producción</h2>
            <span className="order-count">{orders.length} órdenes</span>
          </div>

          {orders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>No hay órdenes todavía</h3>
              <p>Crea tu primera orden usando el formulario</p>
            </div>
          ) : (
            <div className="orders-table-container">
              <table className="nissan-table orders-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Línea</th>
                    <th>Planeada</th>
                    <th>Producida</th>
                    <th>Estado</th>
                    <th>Responsable</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index} className={editingIndex === index ? 'editing-row' : ''}>
                      <td>
                        <span className="order-id">#{order.id}</span>
                      </td>
                      <td>{formatDate(order.fecha)}</td>
                      <td>
                        <span className="linea-tag">{order.linea}</span>
                      </td>
                      <td>
                        <span className="quantity">{order.cantidadPlaneada || '0'}</span>
                      </td>
                      <td>
                        <span className="quantity">{order.cantidadProducida || '0'}</span>
                      </td>
                      <td>
                        <span 
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(order.estado) }}
                        >
                          {order.estado}
                        </span>
                      </td>
                      <td>
                        <span className="responsable">{order.responsable || 'Sin asignar'}</span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn-action btn-edit"
                            onClick={() => handleEditOrder(index)}
                            title="Editar orden"
                          >
                            ✏️ Editar
                          </button>
                          <button 
                            className="btn-action btn-delete"
                            onClick={() => handleDeleteOrder(index)}
                            title="Eliminar orden"
                          >
                            🗑️ Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ControlRoom;