document.addEventListener('DOMContentLoaded', () => {
    // funcion para cargar la info del usuario
    const loadUserInfo = async () => {
      try {
        const response = await fetch('http://107.20.213.249/api/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('token')}`, // Token de autenticación
          },
        });
    
        // Parseamos la respuesta
        const data = await response.json();
    
        if (response.ok) {
          // Actualizamos el DOM con los datos
          document.getElementById('user-name').textContent = data.name || 'Nombre no disponible';
          document.getElementById('user-email').textContent = data.email || 'Correo no disponible';
        } else {
          alert(`Error al cargar datos: ${data.message}`);
        }
      } catch (error) {
        console.error('Error al cargar la info del usuario:', error);
        alert('Hubo un problema al cargar la información del usuario.');
      }
    };
    
  
    // funcion para actualizar la info del usuario
    const updateUserInfo = async (event) => {
      event.preventDefault(); // para que no recargue la pagina al enviar el formulario
  
      const name = document.getElementById('update-name').value; // agarramos el nombre nuevo
      const email = document.getElementById('update-email').value; // agarramos el email nuevo
  
      try {
        // hacemos el fetch para mandar la actualizacion
        const response = await fetch('http://107.20.213.249/api/profile', {
          method: 'PUT', // metodo put para actualizar
          headers: {
            'Content-Type': 'application/json', // tipo de contenido
            Authorization: `Bearer ${getCookie('token')}`, // mandamos el token jwt
          },
          body: JSON.stringify({ name, email }), // el body con la info nueva
        });
  
        const data = await response.json(); // convertimos la respuesta a json
  
        if (response.ok) {
          alert('informacion actualizada'); // si todo bien, avisamos
          loadUserInfo(); // volvemos a cargar la info del usuario
        } else {
          alert(`error: ${data.message}`); // si algo sale mal, avisamos
        }
      } catch (error) {
        console.error('error al actualizar la info del usuario:', error); // logueamos el error
        alert('hubo un problema al actualizar la info del usuario'); // le decimos al usuario
      }
    };
  
    // funcion para agarrar cookies (el token)
    const getCookie = (name) => {
      const value = `; ${document.cookie}`; // agarra todas las cookies
      const parts = value.split(`; ${name}=`); // busca la cookie por nombre
      if (parts.length === 2) return parts.pop().split(';').shift(); // retorna el valor de la cookie
    };
  
    // agregamos el evento al formulario de actualizar
    const updateForm = document.getElementById('update-form');
    if (updateForm) {
      updateForm.addEventListener('submit', updateUserInfo); // cuando lo manden llamamos la funcion
    }
  
    // cargamos la info del usuario al cargar la pagina
    loadUserInfo();
  });
  
