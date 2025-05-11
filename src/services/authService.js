const API_URL = import.meta.env.VITE_API_URL;

export const authService = {
  async login(username, password) {
    const response = await fetch(`${API_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en el inicio de sesión');
    }

    // Validar que existen las propiedades necesarias
    if (!data.accessToken || !data.username) {
      throw new Error('Respuesta del servidor incompleta');
    }

    // Adaptar al formato esperado: { token, user }
    return {
      token: data.accessToken,
      user: {
        id: data.id,
        username: data.username,
        email: data.email,
        roles: (data.roles || []).map(role => role.replace('ROLE_', '').toLowerCase())
      }
    };
  },

   async register(username, email, password, role) {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Enviar el rol como arreglo: roles: [role]
      body: JSON.stringify({ username, email, password, roles: [role] }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en el registro');
    }

    return data;
  },

  getToken() {
    return localStorage.getItem('token');
  },

  getAuthHeader() {
    const token = this.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
};
