import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validaciones
    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor ingresa un correo válido');
      return;
    }

    setIsLoading(true);
    
    try {
      const userData = await login(email, password);
      
      // Redirigir según el tipo de usuario
      if (userData.type === 'maintenance') {
        navigate('/maintenance');
      } else if (userData.type === 'finance') {
        navigate('/finance');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Para recuperar tu contraseña contacta al administrador del sistema');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>NISSAN</h1>
          <h2>BIENVENIDO</h2>
          <p className="login-subtitle">Sistema de Gestión de Producción</p>
        </div>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Ingresa tu dirección e-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="ejemplo@nissan.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Ingresa tu contraseña"
              required
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className="btn-nissan login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Iniciando sesión...
              </>
            ) : 'Iniciar sesión'}
          </button>

          <div className="login-actions">
            <button 
              type="button" 
              className="link-button"
              onClick={handleForgotPassword}
              disabled={isLoading}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <div className="login-footer">
            <p>
              ¿No tienes una cuenta?{' '}
              <button 
                type="button" 
                className="register-link"
                onClick={handleRegister}
                disabled={isLoading}
              >
                Crear una cuenta
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;