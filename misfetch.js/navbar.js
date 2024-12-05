document.addEventListener('DOMContentLoaded', () => {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const checkUserStatus = async () => {
    const token = getCookie('token');
    if (!token) return { isLoggedIn: false };

    try {
      const response = await fetch('http://localhost:3001/api/profile', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        return { isLoggedIn: true, user: data };
      } else if (response.status === 401) {
        document.cookie = 'token=; Max-Age=0'; // Token inválido
      }
      return { isLoggedIn: false };
    } catch (error) {
      console.error('Error al verificar el estado del usuario:', error);
      return { isLoggedIn: false };
    }
  };

  const renderLoggedInNavbar = (user) => `
    <a href="/wallet" class="btn btn-primary me-2">$${user.money || 0}</a>
    <form id="logout-form" class="d-inline">
      <button type="submit" class="btn btn-danger">Cerrar Sesión</button>
    </form>
  `;

  const renderLoggedOutNavbar = () => `
    <a href="/wallet" class="btn btn-primary me-2">$0</a>
    <a href="/login" class="btn btn-primary me-2">Iniciar Sesión</a>
    <a href="/signup" class="btn btn-secondary">Registrarse</a>
  `;

  const renderNavbar = async () => {
    const navbarContainer = document.querySelector('.navbar .d-flex');
    navbarContainer.innerHTML = '<span>Cargando...</span>';

    const { isLoggedIn, user } = await checkUserStatus();

    if (isLoggedIn) {
      navbarContainer.innerHTML = renderLoggedInNavbar(user);
      const logoutForm = document.getElementById('logout-form');
      logoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        document.cookie = 'token=; Max-Age=0';
        window.location.href = '/login';
      });
    } else {
      navbarContainer.innerHTML = renderLoggedOutNavbar();
    }
  };

  renderNavbar();
});
