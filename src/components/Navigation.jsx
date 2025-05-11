import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navigation.css';

const Navigation = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="navigation">
      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            Inicio
          </NavLink>
        </li>
        
        {!isAuthenticated() ? (
          <>
            <li>
              <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
                Iniciar Sesión
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>
                Registrarse
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/user" className={({ isActive }) => isActive ? 'active' : ''}>
                Mi Perfil
              </NavLink>
            </li>
            
            {user && user.roles?.includes('moderator') && (
              <li>
                <NavLink to="/moderator" className={({ isActive }) => isActive ? 'active' : ''}>
                  Panel de Moderador
                </NavLink>
              </li>
            )}
            
            {user && user.roles?.includes('admin') && (
              <li>
                <NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>
                  Panel de Admin
                </NavLink>
              </li>
            )}
            
            <li>
              <button className="logout-btn" onClick={logout}>
                Cerrar Sesión
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;