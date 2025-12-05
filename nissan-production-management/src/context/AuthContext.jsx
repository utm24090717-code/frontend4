import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cargar usuario almacenado en localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('nissan_current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ============================
  // LOGIN REAL CON TU API
  // ============================
  const login = async (email, password) => {
    setLoading(true);

    try {
      const response = await apiLogin(email, password);

      const usuario = response.data.usuario;

      // Convertir rol numérico a texto según frontend
      let userType = "default";

      if (usuario.rol === 1) userType = "supervisor";
      if (usuario.rol === 2) userType = "maintenance";
      if (usuario.rol === 3) userType = "finance";

      const userSession = {
        id: usuario.id,
        email: usuario.correo,
        name: usuario.nombre,
        type: userType,
        rol: usuario.rol
      };

      setUser(userSession);
      localStorage.setItem('nissan_current_user', JSON.stringify(userSession));

      setLoading(false);
      return userSession;
    } catch (error) {
      setLoading(false);
      throw new Error(error.response?.data?.error || "Error en login");
    }
  };

  // ============================
  // REGISTER REAL CON TU API
  // ============================
  const register = async (email, password, userType) => {
    setLoading(true);

    try {
      // Convertir userType del frontend → rolId del backend
      let rolId = 1;
      if (userType === "maintenance") rolId = 2;
      if (userType === "finance") rolId = 3;

      const response = await apiRegister(email.split('@')[0], email, password, rolId);

      // Crear sesión automática
      const userSession = {
        id: response.data.id,
        email,
        name: email.split('@')[0],
        type: userType,
        rol: rolId
      };

      setUser(userSession);
      localStorage.setItem('nissan_current_user', JSON.stringify(userSession));

      setLoading(false);
      return userSession;

    } catch (error) {
      setLoading(false);
      throw new Error(error.response?.data?.error || "Error en registro");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nissan_current_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};