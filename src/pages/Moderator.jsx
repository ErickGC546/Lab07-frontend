import React, { useState } from 'react';
import './Moderator.css';

const Moderator = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState(5);
  
  // Datos de ejemplo para el contenido pendiente
  const [pendingContent, setPendingContent] = useState([
    { id: 1, title: 'Publicación sobre política', author: 'usuario123', date: '2023-05-15', type: 'post' },
    { id: 2, title: 'Imagen en galería', author: 'fotografo22', date: '2023-05-14', type: 'image' },
    { id: 3, title: 'Comentario ofensivo', author: 'anonimo45', date: '2023-05-14', type: 'comment' }
  ]);

  // Datos de ejemplo para reportes
  const [reports, setReports] = useState([
    { id: 1, content: 'Post con información falsa', type: 'misinformation', author: 'user456', status: 'pending', date: '2023-05-16' },
    { id: 2, content: 'Comentario ofensivo en debate', type: 'harassment', author: 'anon789', status: 'pending', date: '2023-05-15' },
    { id: 3, content: 'Spam en sección de comentarios', type: 'spam', author: 'spammer123', status: 'resolved', date: '2023-05-14' },
    { id: 4, content: 'Imagen inapropiada', type: 'inappropriate', author: 'uploader22', status: 'pending', date: '2023-05-13' }
  ]);

  // Datos de ejemplo para comentarios
  const [comments, setComments] = useState([
    { id: 1, content: 'Esto es claramente falso, deberían verificar sus fuentes.', author: 'user123', likes: 5, flags: 3, date: '2023-05-16' },
    { id: 2, content: '¡Excelente artículo! Muy informativo.', author: 'reader456', likes: 12, flags: 0, date: '2023-05-15' },
    { id: 3, content: 'No estoy de acuerdo con esto para nada...', author: 'opinionated', likes: 2, flags: 1, date: '2023-05-15' },
    { id: 4, content: 'SPAM: Compre nuestros productos milagro...', author: 'spammer', likes: 0, flags: 8, date: '2023-05-14' }
  ]);

  // Datos de ejemplo para usuarios
  const [users, setUsers] = useState([
    { id: 1, username: 'user123', email: 'user123@example.com', role: 'member', status: 'active', joined: '2023-01-15' },
    { id: 2, username: 'moderator1', email: 'mod1@example.com', role: 'moderator', status: 'active', joined: '2022-11-20' },
    { id: 3, username: 'spammer22', email: 'spam@example.com', role: 'member', status: 'banned', joined: '2023-03-10' },
    { id: 4, username: 'newuser', email: 'new@example.com', role: 'member', status: 'active', joined: '2023-05-01' }
  ]);

  // Estadísticas de ejemplo
  const stats = {
    contentApproved: 42,
    contentRejected: 8,
    reportsHandled: 35,
    usersBanned: 3,
    activeUsers: 128,
    commentsDeleted: 12
  };

  const handleApprove = (id) => {
    setPendingContent(pendingContent.filter(item => item.id !== id));
    setNotifications(prev => prev - 1);
  };

  const handleReject = (id) => {
    setPendingContent(pendingContent.filter(item => item.id !== id));
    setNotifications(prev => prev - 1);
  };

  const handleReportAction = (id, action) => {
    if (action === 'resolve') {
      setReports(reports.map(report => 
        report.id === id ? { ...report, status: 'resolved' } : report
      ));
    } else if (action === 'delete') {
      setReports(reports.filter(report => report.id !== id));
    }
    setNotifications(prev => prev - 1);
  };

  const handleCommentAction = (id, action) => {
    if (action === 'delete') {
      setComments(comments.filter(comment => comment.id !== id));
    } else if (action === 'warn') {
      // Lógica para enviar advertencia al usuario
      alert(`Advertencia enviada al autor del comentario ${id}`);
    }
  };

  const handleUserAction = (id, action) => {
    if (action === 'ban') {
      setUsers(users.map(user => 
        user.id === id ? { ...user, status: 'banned' } : user
      ));
    } else if (action === 'warn') {
      // Lógica para enviar advertencia al usuario
      alert(`Advertencia enviada al usuario ${id}`);
    } else if (action === 'promote' && users.find(u => u.id === id).role === 'member') {
      setUsers(users.map(user => 
        user.id === id ? { ...user, role: 'moderator' } : user
      ));
    }
  };

  return (
    <div className="moderator-dashboard">
      <header className="moderator-header">
        <h1>Panel de Moderador</h1>
        <div className="notification-badge">
          <i className="fas fa-bell"></i>
          {notifications > 0 && <span className="badge">{notifications}</span>}
        </div>
      </header>
      
      <div className="moderator-container">
        <nav className="moderator-sidebar">
          <ul>
            <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </li>
            <li className={activeTab === 'content' ? 'active' : ''} onClick={() => setActiveTab('content')}>
              <i className="fas fa-file-alt"></i> Contenido Pendiente
            </li>
            <li className={activeTab === 'reports' ? 'active' : ''} onClick={() => setActiveTab('reports')}>
              <i className="fas fa-flag"></i> Reportes
            </li>
            <li className={activeTab === 'comments' ? 'active' : ''} onClick={() => setActiveTab('comments')}>
              <i className="fas fa-comments"></i> Comentarios
            </li>
            <li className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
              <i className="fas fa-users"></i> Gestión de Usuarios
            </li>
            <li className={activeTab === 'stats' ? 'active' : ''} onClick={() => setActiveTab('stats')}>
              <i className="fas fa-chart-bar"></i> Estadísticas
            </li>
          </ul>
        </nav>
        
        <main className="moderator-main">
          {activeTab === 'dashboard' && (
            <div className="dashboard-overview">
              <div className="welcome-message">
                <h2>Bienvenido Moderador</h2>
                <p>Aquí puedes gestionar el contenido, reportes y usuarios de la plataforma.</p>
              </div>
              
              <div className="stats-cards">
                <div className="stat-card">
                  <h3>Contenido Pendiente</h3>
                  <p className="count">{pendingContent.length}</p>
                  <button className="btn btn-primary" onClick={() => setActiveTab('content')}>
                    Revisar
                  </button>
                </div>
                
                <div className="stat-card">
                  <h3>Reportes Nuevos</h3>
                  <p className="count">{reports.filter(r => r.status === 'pending').length}</p>
                  <button className="btn btn-primary" onClick={() => setActiveTab('reports')}>
                    Ver Reportes
                  </button>
                </div>
                
                <div className="stat-card">
                  <h3>Comentarios Reportados</h3>
                  <p className="count">{comments.filter(c => c.flags > 0).length}</p>
                  <button className="btn btn-primary" onClick={() => setActiveTab('comments')}>
                    Moderar
                  </button>
                </div>
              </div>
              
              <div className="quick-actions">
                <h3>Acciones Rápidas</h3>
                <div className="action-buttons">
                  <button className="btn btn-secondary" onClick={() => setActiveTab('users')}>
                    <i className="fas fa-user-lock"></i> Banear Usuario
                  </button>
                  <button className="btn btn-secondary">
                    <i className="fas fa-search"></i> Buscar Contenido
                  </button>
                  <button className="btn btn-secondary">
                    <i className="fas fa-filter"></i> Filtros Avanzados
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'content' && (
            <div className="content-management">
              <div className="section-header">
                <h2>Contenido Pendiente de Moderación</h2>
                <div className="content-filters">
                  <select className="filter-select">
                    <option>Todos los tipos</option>
                    <option>Posts</option>
                    <option>Imágenes</option>
                    <option>Comentarios</option>
                  </select>
                  <input type="text" placeholder="Buscar..." className="search-input" />
                </div>
              </div>
              
              <div className="content-list">
                {pendingContent.length > 0 ? (
                  pendingContent.map(item => (
                    <div key={item.id} className="content-item">
                      <div className="content-info">
                        <div className="content-type-badge">
                          {item.type === 'post' && <i className="fas fa-file-alt"></i>}
                          {item.type === 'image' && <i className="fas fa-image"></i>}
                          {item.type === 'comment' && <i className="fas fa-comment"></i>}
                        </div>
                        <div>
                          <h4>{item.title}</h4>
                          <p>Autor: {item.author} | Fecha: {item.date}</p>
                        </div>
                      </div>
                      <div className="content-actions">
                        <button className="btn btn-success" onClick={() => handleApprove(item.id)}>
                          <i className="fas fa-check"></i> Aprobar
                        </button>
                        <button className="btn btn-danger" onClick={() => handleReject(item.id)}>
                          <i className="fas fa-times"></i> Rechazar
                        </button>
                        <button className="btn btn-info">
                          <i className="fas fa-eye"></i> Vista Previa
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <i className="fas fa-check-circle"></i>
                    <p>No hay contenido pendiente de moderación</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'reports' && (
            <div className="reports-management">
              <div className="section-header">
                <h2>Reportes Pendientes</h2>
                <div className="report-filters">
                  <select className="filter-select">
                    <option>Todos los estados</option>
                    <option>Pendientes</option>
                    <option>Resueltos</option>
                  </select>
                  <select className="filter-select">
                    <option>Todos los tipos</option>
                    <option>Desinformación</option>
                    <option>Acoso</option>
                    <option>Spam</option>
                    <option>Inapropiado</option>
                  </select>
                </div>
              </div>
              
              <div className="reports-list">
                {reports.length > 0 ? (
                  reports.map(report => (
                    <div key={report.id} className={`report-item ${report.status}`}>
                      <div className="report-info">
                        <div className="report-type">
                          {report.type === 'misinformation' && <i className="fas fa-info-circle"></i>}
                          {report.type === 'harassment' && <i className="fas fa-user-shield"></i>}
                          {report.type === 'spam' && <i className="fas fa-ban"></i>}
                          {report.type === 'inappropriate' && <i className="fas fa-exclamation-triangle"></i>}
                          <span className="type-label">{report.type}</span>
                        </div>
                        <h4>{report.content}</h4>
                        <p>Reportado por: {report.author} | Fecha: {report.date}</p>
                        {report.status === 'resolved' && (
                          <span className="status-badge resolved">
                            <i className="fas fa-check-circle"></i> Resuelto
                          </span>
                        )}
                        {report.status === 'pending' && (
                          <span className="status-badge pending">
                            <i className="fas fa-clock"></i> Pendiente
                          </span>
                        )}
                      </div>
                      <div className="report-actions">
                        {report.status === 'pending' && (
                          <>
                            <button 
                              className="btn btn-success" 
                              onClick={() => handleReportAction(report.id, 'resolve')}
                            >
                              <i className="fas fa-check"></i> Marcar como resuelto
                            </button>
                            <button 
                              className="btn btn-danger" 
                              onClick={() => handleReportAction(report.id, 'delete')}
                            >
                              <i className="fas fa-trash"></i> Eliminar reporte
                            </button>
                          </>
                        )}
                        <button className="btn btn-info">
                          <i className="fas fa-eye"></i> Ver contenido
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <i className="fas fa-flag"></i>
                    <p>No hay reportes pendientes</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'comments' && (
            <div className="comments-management">
              <div className="section-header">
                <h2>Moderación de Comentarios</h2>
                <div className="comment-filters">
                  <select className="filter-select">
                    <option>Todos los comentarios</option>
                    <option>Reportados</option>
                    <option>Con más likes</option>
                    <option>Recientes</option>
                  </select>
                  <input type="text" placeholder="Buscar..." className="search-input" />
                </div>
              </div>
              
              <div className="comments-list">
                {comments.length > 0 ? (
                  comments.map(comment => (
                    <div key={comment.id} className={`comment-item ${comment.flags > 0 ? 'flagged' : ''}`}>
                      <div className="comment-content">
                        <p>{comment.content}</p>
                        <div className="comment-meta">
                          <span><i className="fas fa-user"></i> {comment.author}</span>
                          <span><i className="fas fa-calendar"></i> {comment.date}</span>
                          <span><i className="fas fa-thumbs-up"></i> {comment.likes}</span>
                          {comment.flags > 0 && (
                            <span className="flag-count"><i className="fas fa-flag"></i> {comment.flags}</span>
                          )}
                        </div>
                      </div>
                      <div className="comment-actions">
                        {comment.flags > 0 && (
                          <>
                            <button 
                              className="btn btn-danger" 
                              onClick={() => handleCommentAction(comment.id, 'delete')}
                            >
                              <i className="fas fa-trash"></i> Eliminar
                            </button>
                            <button 
                              className="btn btn-warning" 
                              onClick={() => handleCommentAction(comment.id, 'warn')}
                            >
                              <i className="fas fa-exclamation-triangle"></i> Advertir
                            </button>
                          </>
                        )}
                        <button className="btn btn-info">
                          <i className="fas fa-eye"></i> Ver contexto
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <i className="fas fa-comments"></i>
                    <p>No hay comentarios para moderar</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'users' && (
            <div className="users-management">
              <div className="section-header">
                <h2>Gestión de Usuarios</h2>
                <div className="user-filters">
                  <select className="filter-select">
                    <option>Todos los usuarios</option>
                    <option>Activos</option>
                    <option>Baneados</option>
                    <option>Moderadores</option>
                  </select>
                  <input type="text" placeholder="Buscar usuario..." className="search-input" />
                </div>
              </div>
              
              <div className="users-list">
                {users.length > 0 ? (
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th>Usuario</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Fecha Registro</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.id} className={user.status}>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`role-badge ${user.role}`}>
                              {user.role === 'moderator' ? 'Moderador' : 'Miembro'}
                            </span>
                          </td>
                          <td>
                            <span className={`status-badge ${user.status}`}>
                              {user.status === 'banned' ? 'Baneado' : 'Activo'}
                            </span>
                          </td>
                          <td>{user.joined}</td>
                          <td className="user-actions">
                            {user.status !== 'banned' && user.role === 'member' && (
                              <button 
                                className="btn btn-danger btn-sm" 
                                onClick={() => handleUserAction(user.id, 'ban')}
                              >
                                <i className="fas fa-ban"></i> Banear
                              </button>
                            )}
                            {user.status === 'banned' && (
                              <button className="btn btn-success btn-sm">
                                <i className="fas fa-check"></i> Desbanear
                              </button>
                            )}
                            {user.role === 'member' && (
                              <button 
                                className="btn btn-warning btn-sm" 
                                onClick={() => handleUserAction(user.id, 'warn')}
                              >
                                <i className="fas fa-exclamation-triangle"></i> Advertir
                              </button>
                            )}
                            {user.role === 'member' && (
                              <button 
                                className="btn btn-primary btn-sm" 
                                onClick={() => handleUserAction(user.id, 'promote')}
                              >
                                <i className="fas fa-user-shield"></i> Hacer moderador
                              </button>
                            )}
                            <button className="btn btn-info btn-sm">
                              <i className="fas fa-eye"></i> Ver
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="empty-state">
                    <i className="fas fa-users"></i>
                    <p>No hay usuarios registrados</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'stats' && (
            <div className="stats-management">
              <h2>Estadísticas de Moderación</h2>
              
              <div className="stats-grid">
                
                <div className="stat-card">
                  <h3>Contenido Aprobado</h3>
                  <p className="count">{stats.contentApproved}</p>
                  <div className="stat-trend up">
                    <i className="fas fa-arrow-up"></i> 12% desde la semana pasada
                  </div>
                </div>
                
                <div className="stat-card">
                  <h3>Contenido Rechazado</h3>
                  <p className="count">{stats.contentRejected}</p>
                  <div className="stat-trend down">
                    <i className="fas fa-arrow-down"></i> 5% desde la semana pasada
                  </div>
                </div>
                
                <div className="stat-card">
                  <h3>Reportes Gestionados</h3>
                  <p className="count">{stats.reportsHandled}</p>
                  <div className="stat-trend up">
                    <i className="fas fa-arrow-up"></i> 18% desde la semana pasada
                  </div>
                </div>
                
                <div className="stat-card">
                  <h3>Usuarios Baneados</h3>
                  <p className="count">{stats.usersBanned}</p>
                </div>
                
                <div className="stat-card">
                  <h3>Usuarios Activos</h3>
                  <p className="count">{stats.activeUsers}</p>
                </div>
                
                
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Moderator;