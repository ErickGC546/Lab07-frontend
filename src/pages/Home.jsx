import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home-container">
      <h1>Bienvenido a Mi Aplicación</h1>
      
      {isAuthenticated() ? (
        <div className="welcome-message">
          <h2>Hola, {user.username}</h2>
          <p>Has iniciado sesión como: <strong>{user.roles}</strong></p>
          
          <div className="role-links">
            <Link to="/user" className="btn">Ir a Mi Perfil</Link>
            
            {user.roles === 'moderator' && (
              <Link to="/moderator" className="btn">Panel de Moderador</Link>
            )}
            
            {user.roles === 'admin' && (
              <Link to="/admin" className="btn">Panel de Administrador</Link>
            )}
          </div>
        </div>
      ) : (
        <div className="auth-options">
          <p>Por favor, inicia sesión o regístrate para continuar.</p>
          <div className="auth-buttons">
            <Link to="/login" className="btn">Iniciar Sesión</Link>
            <Link to="/register" className="btn">Registrarse</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;