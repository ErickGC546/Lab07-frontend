import React, { useState } from 'react';
import './Admin.css'; // Archivo CSS separado para el admin

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState(7);
  
  // Datos de ejemplo
  const [users, setUsers] = useState([
    { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin', lastLogin: '2023-05-20 14:30' },
    { id: 2, username: 'mod1', email: 'mod1@example.com', role: 'moderator', lastLogin: '2023-05-20 10:15' },
    { id: 3, username: 'user1', email: 'user1@example.com', role: 'user', lastLogin: '2023-05-19 18:45' },
    { id: 4, username: 'user2', email: 'user2@example.com', role: 'user', lastLogin: '2023-05-18 22:10' }
  ]);

  const [systemStats, setSystemStats] = useState({
    totalUsers: 1243,
    activeToday: 287,
    newRegistrations: 24,
    storageUsed: '78%',
    serverLoad: '32%',
    lastBackup: '2023-05-20 02:00'
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: 'Configuración actualizada', user: 'admin', time: 'Hace 15 minutos' },
    { id: 2, action: 'Nuevo usuario registrado', user: 'user123', time: 'Hace 32 minutos' },
    { id: 3, action: 'Backup completado', user: 'system', time: 'Hace 2 horas' },
    { id: 4, action: 'Actualización de seguridad', user: 'admin', time: 'Hace 5 horas' }
  ]);

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-left">
          <h1>Panel de Administración</h1>
          <span className="admin-badge">Admin</span>
        </div>
        <div className="admin-header-right">
          <div className="notification-badge">
            <i className="fas fa-bell"></i>
            {notifications > 0 && <span className="badge">{notifications}</span>}
          </div>
          <div className="admin-profile">
            <i className="fas fa-user-shield"></i>
            <span>Administrador</span>
          </div>
        </div>
      </header>
      
      <div className="admin-container">
        <nav className="admin-sidebar">
          <div className="admin-logo">
            <i className="fas fa-shield-alt"></i>
            <span>Admin Console</span>
          </div>
          <ul>
            <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </li>
            <li className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
              <i className="fas fa-users-cog"></i> Gestión de Usuarios
            </li>
            <li className={activeTab === 'system' ? 'active' : ''} onClick={() => setActiveTab('system')}>
              <i className="fas fa-server"></i> Configuración del Sistema
            </li>
            <li className={activeTab === 'security' ? 'active' : ''} onClick={() => setActiveTab('security')}>
              <i className="fas fa-lock"></i> Seguridad
            </li>
            <li className={activeTab === 'reports' ? 'active' : ''} onClick={() => setActiveTab('reports')}>
              <i className="fas fa-chart-bar"></i> Reportes Avanzados
            </li>
            <li className={activeTab === 'backups' ? 'active' : ''} onClick={() => setActiveTab('backups')}>
              <i className="fas fa-database"></i> Copias de Seguridad
            </li>
            <li className={activeTab === 'logs' ? 'active' : ''} onClick={() => setActiveTab('logs')}>
              <i className="fas fa-clipboard-list"></i> Registros del Sistema
            </li>
          </ul>
        </nav>
        
        <main className="admin-main">
          {activeTab === 'dashboard' && (
            <div className="dashboard-overview">
              <div className="welcome-message">
                <h2>Bienvenido Administrador</h2>
                <p>Panel de control principal del sistema. Desde aquí puedes gestionar todos los aspectos de la plataforma.</p>
              </div>
              
              <div className="stats-grid">
                <div className="stat-card critical">
                  <h3>Usuarios Totales</h3>
                  <p className="count">{systemStats.totalUsers}</p>
                  <div className="stat-trend">
                    <i className="fas fa-arrow-up"></i> 5.7% desde ayer
                  </div>
                </div>
                
                <div className="stat-card warning">
                  <h3>Usuarios Activos Hoy</h3>
                  <p className="count">{systemStats.activeToday}</p>
                </div>
                
                <div className="stat-card success">
                  <h3>Nuevos Registros</h3>
                  <p className="count">{systemStats.newRegistrations}</p>
                </div>
                
                <div className="stat-card danger">
                  <h3>Almacenamiento Usado</h3>
                  <p className="count">{systemStats.storageUsed}</p>
                </div>
              </div>
              
              <div className="admin-row">
                <div className="admin-col">
                  <div className="admin-card">
                    <h3>Actividad Reciente</h3>
                    <div className="activity-list">
                      {recentActivities.map(activity => (
                        <div key={activity.id} className="activity-item">
                          <div className="activity-icon">
                            <i className="fas fa-history"></i>
                          </div>
                          <div className="activity-details">
                            <p className="activity-action">{activity.action}</p>
                            <p className="activity-meta">
                              <span className="activity-user">{activity.user}</span>
                              <span className="activity-time">{activity.time}</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="admin-col">
                  <div className="admin-card">
                    <h3>Estado del Servidor</h3>
                    <div className="server-status">
                      <div className="server-metric">
                        <span className="metric-label">Carga del Servidor:</span>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: systemStats.serverLoad }}
                          ></div>
                        </div>
                        <span className="metric-value">{systemStats.serverLoad}</span>
                      </div>
                      <div className="server-metric">
                        <span className="metric-label">Último Backup:</span>
                        <span className="metric-value">{systemStats.lastBackup}</span>
                      </div>
                      <div className="server-actions">
                        <button className="btn btn-primary">
                          <i className="fas fa-sync-alt"></i> Actualizar Ahora
                        </button>
                        <button className="btn btn-secondary">
                          <i className="fas fa-cog"></i> Configurar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'users' && (
            <div className="users-management">
              <div className="section-header">
                <h2>Gestión de Usuarios</h2>
                <div className="user-actions">
                  <button className="btn btn-primary">
                    <i className="fas fa-plus"></i> Crear Usuario
                  </button>
                  <input 
                    type="text" 
                    placeholder="Buscar usuario..." 
                    className="search-input" 
                  />
                </div>
              </div>
              
              <div className="admin-card">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>Usuario</th>
                      <th>Email</th>
                      <th>Rol</th>
                      <th>Último Acceso</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>
                          <div className="user-info">
                            <i className="fas fa-user"></i>
                            <span>{user.username}</span>
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>
                          <select 
                            value={user.role} 
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            className="role-select"
                          >
                            <option value="admin">Administrador</option>
                            <option value="moderator">Moderador</option>
                            <option value="user">Usuario</option>
                          </select>
                        </td>
                        <td>{user.lastLogin}</td>
                        <td>
                          <div className="table-actions">
                            <button className="btn btn-sm btn-info">
                              <i className="fas fa-eye"></i>
                            </button>
                            <button className="btn btn-sm btn-warning">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="btn btn-sm btn-danger">
                              <i className="fas fa-ban"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'system' && (
            <div className="system-management">
              <h2>Configuración del Sistema</h2>
              <div className="admin-card">
                <div className="system-settings">
                  <div className="setting-group">
                    <h3>Configuración General</h3>
                    <div className="setting-item">
                      <label>Nombre del Sitio</label>
                      <input type="text" defaultValue="Mi Plataforma" />
                    </div>
                    <div className="setting-item">
                      <label>URL Base</label>
                      <input type="text" defaultValue="https://miplataforma.com" />
                    </div>
                    <div className="setting-item">
                      <label>Zona Horaria</label>
                      <select defaultValue="UTC-5">
                        <option>UTC-5</option>
                        <option>UTC-6</option>
                        <option>UTC-4</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="setting-group">
                    <h3>Configuración de Correo</h3>
                    <div className="setting-item">
                      <label>SMTP Host</label>
                      <input type="text" defaultValue="smtp.miplataforma.com" />
                    </div>
                    <div className="setting-item">
                      <label>SMTP Puerto</label>
                      <input type="number" defaultValue="587" />
                    </div>
                    <div className="setting-item">
                      <label>Email de Envío</label>
                      <input type="email" defaultValue="noreply@miplataforma.com" />
                    </div>
                  </div>
                  
                  <div className="setting-actions">
                    <button className="btn btn-primary">
                      <i className="fas fa-save"></i> Guardar Cambios
                    </button>
                    <button className="btn btn-secondary">
                      <i className="fas fa-undo"></i> Restablecer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="security-management">
              <h2>Configuración de Seguridad</h2>
              <div className="admin-row">
                <div className="admin-col">
                  <div className="admin-card">
                    <h3>Protección Básica</h3>
                    <div className="security-item">
                      <div className="security-info">
                        <h4>Autenticación de Dos Factores</h4>
                        <p>Requerir 2FA para acceso administrativo</p>
                      </div>
                      <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div className="security-item">
                      <div className="security-info">
                        <h4>Límite de Intentos de Login</h4>
                        <p>Bloquear después de 5 intentos fallidos</p>
                      </div>
                      <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div className="security-item">
                      <div className="security-info">
                        <h4>Contraseñas Seguras</h4>
                        <p>Requerir mínimo 12 caracteres con complejidad</p>
                      </div>
                      <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="admin-col">
                  <div className="admin-card">
                    <h3>Registros de Seguridad</h3>
                    <div className="security-logs">
                      <div className="log-item critical">
                        <div className="log-icon">
                          <i className="fas fa-exclamation-triangle"></i>
                        </div>
                        <div className="log-details">
                          <p>Intento de acceso no autorizado detectado</p>
                          <span>Hace 2 horas desde IP 192.168.1.45</span>
                        </div>
                      </div>
                      <div className="log-item warning">
                        <div className="log-icon">
                          <i className="fas fa-user-lock"></i>
                        </div>
                        <div className="log-details">
                          <p>Usuario bloqueado por múltiples intentos fallidos</p>
                          <span>Hace 5 horas - usuario: test123</span>
                        </div>
                      </div>
                      <div className="log-item info">
                        <div className="log-icon">
                          <i className="fas fa-key"></i>
                        </div>
                        <div className="log-details">
                          <p>Contraseña actualizada por administrador</p>
                          <span>Hace 1 día - usuario: admin</span>
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-primary">
                      <i className="fas fa-search"></i> Ver Todos los Registros
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'reports' && (
            <div className="reports-management">
              <h2>Reportes Avanzados</h2>
              <div className="admin-card">
                <div className="report-placeholder">
                  <i className="fas fa-chart-pie"></i>
                  <h3>Reportes del Sistema</h3>
                  <p>Seleccione un tipo de reporte para generar estadísticas detalladas</p>
                  <div className="report-options">
                    <button className="btn btn-primary">
                      <i className="fas fa-users"></i> Reporte de Usuarios
                    </button>
                    <button className="btn btn-primary">
                      <i className="fas fa-file-alt"></i> Reporte de Contenido
                    </button>
                    <button className="btn btn-primary">
                      <i className="fas fa-flag"></i> Reporte de Moderación
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'backups' && (
            <div className="backups-management">
              <h2>Gestión de Copias de Seguridad</h2>
              <div className="admin-card">
                <div className="backup-controls">
                  <button className="btn btn-primary">
                    <i className="fas fa-plus"></i> Crear Backup Ahora
                  </button>
                  <button className="btn btn-secondary">
                    <i className="fas fa-cog"></i> Configurar Automatización
                  </button>
                </div>
                
                <div className="backup-list">
                  <div className="backup-item">
                    <div className="backup-info">
                      <i className="fas fa-database"></i>
                      <div>
                        <h4>Backup Completo</h4>
                        <p>20/05/2023 02:00 - Tamaño: 2.4GB</p>
                      </div>
                    </div>
                    <div className="backup-actions">
                      <button className="btn btn-sm btn-info">
                        <i className="fas fa-download"></i> Descargar
                      </button>
                      <button className="btn btn-sm btn-danger">
                        <i className="fas fa-trash"></i> Eliminar
                      </button>
                    </div>
                  </div>
                  <div className="backup-item">
                    <div className="backup-info">
                      <i className="fas fa-database"></i>
                      <div>
                        <h4>Backup Incremental</h4>
                        <p>19/05/2023 02:00 - Tamaño: 450MB</p>
                      </div>
                    </div>
                    <div className="backup-actions">
                      <button className="btn btn-sm btn-info">
                        <i className="fas fa-download"></i> Descargar
                      </button>
                      <button className="btn btn-sm btn-danger">
                        <i className="fas fa-trash"></i> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'logs' && (
            <div className="logs-management">
              <h2>Registros del Sistema</h2>
              <div className="admin-card">
                <div className="log-filters">
                  <select className="filter-select">
                    <option>Todos los niveles</option>
                    <option>Crítico</option>
                    <option>Error</option>
                    <option>Advertencia</option>
                    <option>Info</option>
                  </select>
                  <input 
                    type="text" 
                    placeholder="Buscar en registros..." 
                    className="search-input" 
                  />
                  <button className="btn btn-secondary">
                    <i className="fas fa-filter"></i> Filtrar
                  </button>
                </div>
                
                <div className="system-logs">
                  <div className="log-entry critical">
                    <span className="log-time">[20/05 14:32:45]</span>
                    <span className="log-level">CRITICAL</span>
                    <span className="log-message">Error al conectar con la base de datos principal</span>
                  </div>
                  <div className="log-entry error">
                    <span className="log-time">[20/05 14:32:47]</span>
                    <span className="log-level">ERROR</span>
                    <span className="log-message">Falló el intento de conexión con el servidor de respaldo</span>
                  </div>
                  <div className="log-entry warning">
                    <span className="log-time">[20/05 14:33:12]</span>
                    <span className="log-level">WARNING</span>
                    <span className="log-message">Alto uso de CPU detectado (92%)</span>
                  </div>
                  <div className="log-entry info">
                    <span className="log-time">[20/05 14:33:45]</span>
                    <span className="log-level">INFO</span>
                    <span className="log-message">Conexión con la base de datos restablecida</span>
                  </div>
                  <div className="log-entry info">
                    <span className="log-time">[20/05 14:34:01]</span>
                    <span className="log-level">INFO</span>
                    <span className="log-message">Usuario admin inició sesión desde IP 192.168.1.100</span>
                  </div>
                </div>
                
                <div className="log-pagination">
                  <button className="btn btn-sm btn-secondary">
                    <i className="fas fa-chevron-left"></i> Anterior
                  </button>
                  <span>Página 1 de 5</span>
                  <button className="btn btn-sm btn-secondary">
                    Siguiente <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;