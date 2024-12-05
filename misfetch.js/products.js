document.addEventListener('DOMContentLoaded', () => {
  
    // obtener todos los productos
    const loadAllProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/products', {
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
  
        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // limpiamos la lista anterior
  
        // iteramos por cada producto y lo mostramos
        data.forEach(product => {
          const productCard = document.createElement('div');
          productCard.innerHTML = `
            <div class="product-card">
              <h5>${product.name}</h5>
              <p>${product.description}</p>
              <p>Precio: $${product.price}</p>
              <a href="product-detail.html?id=${product.id}">Ver más</a>
            </div>
          `;
          productList.appendChild(productCard);
        });
  
      } catch (error) {
        console.error('Error al obtener productos:', error);
        alert('Hubo un problema al cargar los productos.');
      }
    };
  
    // obtener un producto por id
    const loadProductById = async (productId) => {
      try {
        const response = await fetch(`http://localhost:3001/api/product/${productId}`, {
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
    
        const productDetail = document.getElementById('product-detail');
        productDetail.innerHTML = ''; // Limpiamos los detalles anteriores
    
        // Mostramos los detalles del producto en una tarjeta
        const product = data.product;
        productDetail.innerHTML = `
          <img src="${product.image || 'https://via.placeholder.com/300'}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h3 class="card-title">${product.name}</h3>
            <p class="card-text">${product.description}</p>
            <p class="card-text"><strong>Precio:</strong> $${product.price}</p>
            <p class="card-text"><strong>Stock disponible:</strong> ${product.stock}</p>
          </div>
        `;
      } catch (error) {
        console.error('Error al obtener el producto:', error);
        alert('Hubo un problema al cargar el producto.');
      }
    };
    
  
    // detectar si estamos en la página de todos los productos o la de un producto especifico
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
  
    if (productId) {
      loadProductById(productId); // cargar producto por id si estamos en la página de detalle
    } else {
      loadAllProducts(); // cargar todos los productos si estamos en la lista general
    }
  });
  