import React from 'react';
import { useAuth } from '../context/AuthContext';
import './RolePage.css';

const User = () => {
  const { user } = useAuth();

  return (
    <div className="role-page user-page">
      <h1>Mi Perfil</h1>
      <div className="role-content">
        <div className="user-info">
          <div className="user-avatar">
            <span className="avatar-placeholder">{user.username.charAt(0).toUpperCase()}</span>
          </div>
          <div className="user-details">
            <h2>{user.username}</h2>
            <p>Correo: {user.email}</p>
            <p>Rol: {user.roles}</p>
          </div>
        </div>
        
        <div className="user-actions">
          <div className="user-card">
            <h3>Mis Preferencias</h3>
            <p>Actualiza tus preferencias y configuración personal.</p>
            <button className="btn">Editar Preferencias</button>
          </div>
          
          <div className="user-card">
            <h3>Seguridad</h3>
            <p>Actualiza tu contraseña y configuración de seguridad.</p>
            <button className="btn">Cambiar Contraseña</button>
          </div>
          
          <div className="user-card">
            <h3>Mi Actividad</h3>
            <p>Revisa tu historial de actividad reciente.</p>
            <button className="btn">Ver Actividad</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default User;