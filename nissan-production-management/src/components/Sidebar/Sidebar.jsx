import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Obtener el dashboard correcto según tipo de usuario
  const getDashboardPath = () => {
    if (!user) return '/dashboard';
    
    switch(user.type) {
      case 'maintenance': return '/maintenance';
      case 'finance': return '/finance';
      default: return '/dashboard';
    }
  };

  // Obtener icono según tipo de usuario
  const getUserIcon = () => {
    if (!user) return '👤';
    
    switch(user.type) {
      case 'maintenance': return '🔧';
      case 'finance': return '💰';
      default: return '👨‍💼';
    }
  };

  // Obtener nombre del rol
  const getUserRoleName = () => {
    if (!user) return 'Usuario';
    
    switch(user.type) {
      case 'maintenance': return 'Mantenimiento';
      case 'finance': return 'Finanzas';
      default: return 'Supervisor';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>NISSAN</h3>
        {user && (
          <div className="user-info">
            <div className="user-avatar">{getUserIcon()}</div>
            <div className="user-details">
              <div className="user-name">{user.name}</div>
              <div className="user-role">{getUserRoleName()}</div>
              <div className="user-email">{user.email}</div>
            </div>
          </div>
        )}
      </div>
      
      <nav className="sidebar-nav">
        <NavLink 
          to="/control-room" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          🏭 Sala de Control
        </NavLink>
        
        <NavLink 
          to={getDashboardPath()}
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          📊 Mi Dashboard
        </NavLink>
        
        <div className="nav-divider"></div>
        
        <button 
          onClick={handleLogout}
          className="logout-button"
        >
          🚪 Cerrar sesión
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;