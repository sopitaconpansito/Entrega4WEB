document.addEventListener('DOMContentLoaded', () => {
    // funcion para hacer la compra
    const makePurchase = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/purchase', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${getCookie('token')}`, // token del usuario
          },
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert('compra realizada con exito'); // avisamos que todo bien
          window.location.reload(); // recargamos la pagina para ver el carrito vacio
        } else {
          alert(`error: ${data.message}`); // si algo falla
        }
      } catch (error) {
        console.error('error al realizar la compra:', error); // mostramos el error
        alert('hubo un problema al procesar la compra'); // mensaje para el usuario
      }
    };
  
    // helper para agarrar cookies
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };
  
    // boton para comprar
    const purchaseButton = document.getElementById('purchase-button');
    if (purchaseButton) {
      purchaseButton.addEventListener('click', makePurchase); // cuando le dan click hacemos la compra
    }
  });
  