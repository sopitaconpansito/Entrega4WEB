document.addEventListener('DOMContentLoaded', () => {

    // carrito del usuario
    const loadCart = async () => {
      try {
        const response = await fetch('http://107.20.213.249/api/shoppingcart', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          alert(`Error: ${data.message}`);
          return;
        }
  
        const cartList = document.getElementById('cart-list');
        cartList.innerHTML = ''; // limpiamos el carrito viejardo
  
        // si el carrito esta vacio mostramos un mensaje
        if (data.length === 0) {
          cartList.innerHTML = '<p>Carrito vacío</p>';
          return;
        }
  
        // iteramos por cada producto en el carrito
        data.forEach(item => {
          const cartItem = document.createElement('div');
          cartItem.innerHTML = `
            <div class="cart-item">
              <h5>${item.name}</h5>
              <p>Cantidad: ${item.quantity}</p>
              <p>Precio: $${item.price}</p>
              <button class="remove-item" data-id="${item.id}">Eliminar</button>
            </div>
          `;
          cartList.appendChild(cartItem);
        });
  
        // agregar evento de click para eliminar producto
        document.querySelectorAll('.remove-item').forEach(button => {
          button.addEventListener('click', async (e) => {
            const productId = e.target.getAttribute('data-id');
            await removeFromCart(productId);
          });
        });
  
      } catch (error) {
        console.error('Error al obtener el carrito:', error);
        alert('Hubo un problema al cargar el carrito.');
      }
    };
  
    // agregar producto al carrito
    const addToCart = async (productId, quantity) => {
      try {
        const response = await fetch(`http://107.20.213.249/api/shoppingcart/${productId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          alert(`Error: ${data.message}`);
          return;
        }
  
        alert('Producto agregado al carrito');
        loadCart(); // actualizamos el carrito
  
      } catch (error) {
        console.error('Error al agregar al carrito:', error);
        alert('Hubo un problema al agregar el producto al carrito.');
      }
    };
  
    // eliminar producto del carrito
    const removeFromCart = async (productId) => {
      try {
        const response = await fetch(`http://107.20.213.249/api/shoppingcart/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          alert(`Error: ${data.message}`);
          return;
        }
  
        alert('Producto eliminado del carrito');
        loadCart(); // actualizamos el carrito
  
      } catch (error) {
        console.error('Error al eliminar el producto del carrito:', error);
        alert('Hubo un problema al eliminar el producto del carrito.');
      }
    };
  
    // inicializamos el carrito al cargar la pagina
    loadCart();
  
    // ejemplo para agregar un producto al carrito (debes ajustar los IDs y la cantidad como necesites)
    document.getElementById('add-to-cart').addEventListener('click', () => {
      const productId = 1; // cambia este id segun el producto
      const quantity = 1; // cantidad a agregar
      addToCart(productId, quantity);
    });
  });
  
