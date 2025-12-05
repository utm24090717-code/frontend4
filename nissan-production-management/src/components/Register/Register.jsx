import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!email || !password || !confirmPassword) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (!userType) {
      setError('Por favor selecciona un tipo de cuenta');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor ingresa un correo válido');
      return;
    }

    setIsLoading(true);

    try {
      const userData = await register(email, password, userType);

      // Redirección según tipo
      if (userData.type === 'maintenance') navigate('/maintenance');
      else if (userData.type === 'finance') navigate('/finance');
      else navigate('/dashboard');

    } catch (err) {
      setError(err.message || 'Error al crear la cuenta');
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  const userTypes = [
    { id: 'supervisor', label: 'Supervisor', icon: '👨‍💼', description: 'Control total de producción' },
    { id: 'maintenance', label: 'Mantenimiento', icon: '🔧', description: 'Gestión de activos y mantenimiento' },
    { id: 'finance', label: 'Finanzas', icon: '💰', description: 'Control de costos y finanzas' }
  ];

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>NISSAN</h1>
          <h2>Crear Cuenta</h2>
          <p className="register-subtitle">Regístrate para acceder al sistema</p>
        </div>

        {error && <div className="error-message">⚠ {error}</div>}

        <form onSubmit={handleSubmit} className="register-form">

          {/* CORREO */}
          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="ejemplo@nissan.com"
              required
              disabled={isLoading}
            />
          </div>

          {/* PASS + CONFIRM */}
          <div className="form-row">
            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="Mínimo 6 caracteres"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label>Confirmar contraseña</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                placeholder="Repite tu contraseña"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* TIPOS DE CUENTA */}
          <div className="form-group">
            <label>Tipo de cuenta</label>
            <div className="user-type-options">

              {userTypes.map((type) => (
                <div
                  key={type.id}
                  className={`user-type-card ${userType === type.id ? 'selected' : ''}`}
                  onClick={() => !isLoading && setUserType(type.id)}
                >
                  <div className="type-icon">{type.icon}</div>

                  <div className="type-info">
                    <h4>{type.label}</h4>
                    <p>{type.description}</p>
                  </div>

                  {userType === type.id && (
                    <div className="type-check">✓</div>
                  )}
                </div>
              ))}

            </div>
          </div>

          {/* BOTONES */}
          <div className="form-actions">

            <button
              type="submit"
              className="btn-nissan register-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Creando cuenta...
                </>
              ) : (
                'Crear cuenta'
              )}
            </button>

            <button
              type="button"
              className="back-button"
              onClick={handleBackToLogin}
              disabled={isLoading}
            >
              ← Volver al login
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;