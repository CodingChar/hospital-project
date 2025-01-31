let productos = [
    {
        nombre: "Paracetamol",
        tipo: "Medicamento",
        precio: 1.5,
        stock: 50,
        vencimiento: "2025-12-31",
        imagen: "https://via.placeholder.com/50",
    },
    {
        nombre: "Proteína en polvo",
        tipo: "Suplemento",
        precio: 25.99,
        stock: 20,
        vencimiento: "2024-05-01",
        imagen: "https://via.placeholder.com/50",
    },
];

function cargarProductos() {
    const tabla = document.querySelector("#productTable tbody");
    tabla.innerHTML = "";

    productos.forEach((producto, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
        <td><img src="${producto.imagen}" alt="${producto.nombre}" /></td>
        <td>${producto.nombre}</td>
        <td>${producto.tipo}</td>
        <td>$${producto.precio.toFixed(2)}</td>
        <td>${producto.stock}</td>
        <td>${producto.vencimiento}</td>
        <td>
          <button class="delete-btn" data-index="${index}">Eliminar</button>
        </td>
      `;
        tabla.appendChild(fila);
    });
}

function buscarProductos() {
    const input = document.querySelector("#searchInput").value.toLowerCase();
    const filtro = document.querySelector("#typeFilter").value;
    const productosFiltrados = productos.filter((producto) => {
        const coincideNombre = producto.nombre.toLowerCase().includes(input);
        const coincideTipo = filtro === "Todos" || producto.tipo === filtro;
        return coincideNombre && coincideTipo;
    });

    const tabla = document.querySelector("#productTable tbody");
    tabla.innerHTML = "";

    productosFiltrados.forEach((producto, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
        <td><img src="${producto.imagen}" alt="${producto.nombre}" /></td>
        <td>${producto.nombre}</td>
        <td>${producto.tipo}</td>
        <td>$${producto.precio.toFixed(2)}</td>
        <td>${producto.stock}</td>
        <td>${producto.vencimiento}</td>
        <td>
          <button class="delete-btn" data-index="${index}">Eliminar</button>
        </td>
      `;
        tabla.appendChild(fila);
    });
}


function guardarProducto(event) {
    event.preventDefault();

    const nuevoProducto = {
        nombre: document.querySelector("#productName").value,
        tipo: document.querySelector("#productType").value,
        precio: parseFloat(document.querySelector("#productPrice").value),
        stock: parseInt(document.querySelector("#productStock").value),
        vencimiento: document.querySelector("#productExpiry").value,
        imagen: "https://via.placeholder.com/50",
    };

    productos.push(nuevoProducto);
    alert("Producto guardado con éxito!");
    document.querySelector("#productForm").reset();
}

if (document.querySelector("#searchButton")) {
    document.querySelector("#searchButton").addEventListener("click", buscarProductos);
    window.addEventListener("load", cargarProductos);
}

if (document.querySelector("#productForm")) {
    document.querySelector("#productForm").addEventListener("submit", guardarProducto);
}