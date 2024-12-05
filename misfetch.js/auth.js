document.addEventListener('DOMContentLoaded', () => {
  
    // registro de usuario
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
      registerForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // para que no recargue la pagina cuando le des submit
  
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
  
        try {
          const response = await fetch('http://localhost:3001/api/signup', {
            method: 'POST', // metodo post para enviar los datos
            headers: {
              'Content-Type': 'application/json', // tipo de contenido que vamos a enviar
            },
            body: JSON.stringify({
              name,
              email,
              password, // el body con los datos que escribimos en los inputs
            }),
          });
  
          const data = await response.json(); // convertimos la respuesta a json
  
          if (response.ok) {
            alert('usuario registrado exitosamente'); // si todo bien, mostramos mensaje
            // si quieres redirigir al usuario o algo mas, lo haces aca
          } else {
            alert(`error: ${data.message}`); // si hay algun error, lo mostramos
          }
        } catch (error) {
          console.error('error en el registro:', error); // mostramos el error en la consola
          alert('hubo un problema al registrar el usuario.'); // y una alerta para el usuario
        }
      });
    }
  
    // login de usuario
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // lo mismo, evitamos que recargue la pagina
  
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
  
        try {
          const response = await fetch('http://localhost:3001/api/login', {
            method: 'POST', // metodo post para el login
            headers: {
              'Content-Type': 'application/json', // enviamos datos como json
            },
            body: JSON.stringify({
              email,
              password, // enviamos el email y el password
            }),
          });
  
          const data = await response.json(); // convertimos la respuesta a json
  
          if (response.ok) {
            alert('login exitoso'); // si todo bien, mostramos mensaje
            // guardamos el token en una cookie
            document.cookie = `token=${data.token}; SameSite=Lax`;
            // redirigimos a la pagina de productos o donde sea
            window.location.href = '/products.html';
          } else {
            alert(`error: ${data.message}`); // si hay algun error, lo mostramos
          }
        } catch (error) {
          console.error('error en el login:', error); // mostramos el error en la consola
          alert('hubo un problema al iniciar sesion.'); // y una alerta para el usuario
        }
      });
    }
  
  });
  