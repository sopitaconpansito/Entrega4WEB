document.addEventListener('DOMContentLoaded', () => {
  // funcion para obtener el total de ventas
  const getTotalSales = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/admin/total', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getCookie('token')}`, // token del admin
        },
      });

      const data = await response.json();

      if (response.ok) {
        document.getElementById('total-sales').textContent = `$${data.total}`; // mostramos el total en la pagina
      } else {
        alert(`error: ${data.message}`); // si algo falla
      }
    } catch (error) {
      console.error('error al obtener el total:', error); // mostramos el error en consola
    }
  };

  // funcion para agregar un producto nuevo
  const addProduct = async (event) => {
    event.preventDefault();

    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const stock = document.getElementById('product-stock').value;
    const imagePath = document.getElementById('product-image').value;
    const description = document.getElementById('product-description').value;

    try {
      const response = await fetch('http://localhost:3001/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token')}`, // token del admin
        },
        body: JSON.stringify({ name, price, stock, image_path: imagePath, description }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('producto agregado'); // avisamos que todo bien
        document.getElementById('product-form').reset(); // limpiamos el form
      } else {
        alert(`error: ${data.message}`); // mostramos el error
      }
    } catch (error) {
      console.error('error al agregar el producto:', error); // mostramos el error en consola
    }
  };

  // funcion para eliminar un producto
  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/admin/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getCookie('token')}`, // token del admin
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert('producto eliminado'); // avisamos que todo bien
        // aqui puedes recargar la lista de productos si tienes una funcion para eso
      } else {
        alert(`error: ${data.message}`); // mostramos el error
      }
    } catch (error) {
      console.error('error al eliminar el producto:', error); // mostramos el error en consola
    }
  };

  // helper para agarrar cookies
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  // inicializamos todo
  getTotalSales();

  const productForm = document.getElementById('product-form');
  if (productForm) {
    productForm.addEventListener('submit', addProduct);
  }

  // ejemplo para eliminar un producto (ajusta los IDs segun el producto)
  document.getElementById('delete-product').addEventListener('click', () => {
    const productId = 1; // cambia este id segun el producto a eliminar
    deleteProduct(productId);
  });
});
