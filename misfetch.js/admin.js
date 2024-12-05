document.addEventListener('DOMContentLoaded', () => {
  // funcion para obtener el total de ventas
  const getTotalSales = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/admin/total', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        document.getElementById('total-sales').textContent = `$${data.total}`;
      } else {
        alert(`error: ${data.message}`);
      }
    } catch (error) {
      console.error('error al obtener el total:', error);
    }
  };

  // funcion para obtener la lista de productos(ojo con como se llama a la api)
  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/products', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });

      const products = await response.json();

      if (response.ok) {
        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; 

        products.forEach((product) => {
          const row = document.createElement('tr');
        
          row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td>
              <button class="btn btn-warning me-2" onclick="editProduct(${product.id})">Modificar</button>
              <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Eliminar</button>
            </td>
          `;

          productList.appendChild(row);
        });
      } else {
        alert(`error: ${products.message}`);
      }
    } catch (error) {
      console.error('error al obtener los productos:', error);
    }
  };

  // funcion para agregar un producto nuevo
  const addProduct = async (event) => {
  event.preventDefault();

  const name = document.getElementById('product-name').value;
  const price = document.getElementById('product-price').value;
  const stock = document.getElementById('product-stock').value;
  const image = document.getElementById('product-image').value; 
  const description = document.getElementById('product-description').value;

  try {
    const response = await fetch('http://localhost:3001/api/admin/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      },
      body: JSON.stringify({ stock, name, price, image, description }), 
    });

    const data = await response.json();

    if (response.ok) {
      alert('Producto agregado');
      document.getElementById('product-form').reset(); 
      getProducts();
    } else {
      alert(`error: ${data.message}`);
    }
  } catch (error) {
    console.error('error al agregar el producto:', error);
  }
};

  // funcion para editar un producto
  window.editProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/admin/product/${productId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });

      const product = await response.json();

      if (response.ok) {
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-stock').value = product.stock;
        document.getElementById('product-image').value = product.image_path;
        document.getElementById('product-description').value = product.description;

        isEditing = true;
        document.getElementById('form-title').textContent = 'Editar Producto';
        document.getElementById('submit-button').textContent = 'Actualizar Producto';
      } else {
        alert(`error: ${product.message}`);
      }
    } catch (error) {
      console.error('Error al editar el producto:', error);
    }
  };

  // funcion para eliminar un producto
  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/admin/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert('Producto eliminado');
        getProducts(); 
      } else {
        alert(`error: ${data.message}`);
      }
    } catch (error) {
      console.error('error al eliminar el producto:', error);
    }
  };

  // obtener cookies
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  // inicializamos las 2 funciones q no requieren apretar nada
  getTotalSales();
  getProducts(); 

  const productForm = document.getElementById('product-form');
  if (productForm) {
    productForm.addEventListener('submit', addProduct);
  }
  
});
