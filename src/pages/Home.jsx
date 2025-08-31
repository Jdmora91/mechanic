import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica (luego conectaremos con backend)
    if (username && password) {
      // Redirigir al dashboard después del login
      navigate('/dashboard');
    }
  };

  return (
    <div className="home-container">
      <div className="login-card">
        {/* Logo y título */}
        <div className="login-header">

          
          <h2>Iniciar Sesion</h2>
        </div>

        {/* Formulario de login */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          <button type="submit" className="login-button">
            🛠️ Iniciar Sesión
          </button>
        </form>

        {/* Mensaje para contactar admin */}
        <div className="login-footer">
          <p>
            ¿No tienes cuenta?{' '}
            <span className="contact-admin">Crear Cuenta</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;