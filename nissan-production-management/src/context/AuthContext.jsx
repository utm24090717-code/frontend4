import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Inicializar localStorage con usuarios vacíos si no existe
  useEffect(() => {
    if (!localStorage.getItem('nissan_users')) {
      localStorage.setItem('nissan_users', JSON.stringify([]));
    }
    
    // Verificar si hay usuario logueado
    const storedUser = localStorage.getItem('nissan_current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Obtener todos los usuarios
  const getUsers = () => {
    const users = localStorage.getItem('nissan_users');
    return users ? JSON.parse(users) : [];
  };

  // Guardar usuarios
  const saveUsers = (users) => {
    localStorage.setItem('nissan_users', JSON.stringify(users));
  };

  // Login: verifica contra usuarios registrados
  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      
      setTimeout(() => {
        const users = getUsers();
        const userFound = users.find(u => 
          u.email.toLowerCase() === email.toLowerCase() && 
          u.password === password
        );

        if (userFound) {
          // Crear objeto de usuario sin contraseña para la sesión
          const userSession = {
            id: userFound.id,
            email: userFound.email,
            type: userFound.type,
            name: userFound.name,
            createdAt: userFound.createdAt
          };
          
          setUser(userSession);
          localStorage.setItem('nissan_current_user', JSON.stringify(userSession));
          setLoading(false);
          resolve(userSession);
        } else {
          setLoading(false);
          reject(new Error('Credenciales incorrectas o usuario no registrado'));
        }
      }, 1000);
    });
  };

  // Registrar nuevo usuario
  const register = async (email, password, userType) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      
      setTimeout(() => {
        try {
          const users = getUsers();
          
          // Verificar si el email ya existe
          const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
          if (emailExists) {
            throw new Error('Este correo ya está registrado');
          }

          const newUser = {
            id: Date.now().toString(),
            email: email.toLowerCase(),
            password,
            type: userType,
            name: email.split('@')[0].replace('.', ' '),
            createdAt: new Date().toISOString()
          };
          
          // Guardar en lista de usuarios
          users.push(newUser);
          saveUsers(users);
          
          // Iniciar sesión automáticamente
          const userSession = {
            id: newUser.id,
            email: newUser.email,
            type: newUser.type,
            name: newUser.name,
            createdAt: newUser.createdAt
          };
          
          setUser(userSession);
          localStorage.setItem('nissan_current_user', JSON.stringify(userSession));
          setLoading(false);
          resolve(userSession);
        } catch (error) {
          setLoading(false);
          reject(error);
        }
      }, 1000);
    });
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
  return context;
};