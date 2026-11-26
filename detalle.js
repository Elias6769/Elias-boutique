
"use strict";

// Catálogo de productos
const productos = [
    {
        id: "1",
        nombre: "Vestido elegante",
        precio: 650,
        categoria: "Ropa para dama",
        descripcion: "Vestido elegante ideal para ocasiones especiales. Combina estilo y comodidad.",
        imagen: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900"
    },
    {
        id: "2",
        nombre: "Conjunto casual",
        precio: 780,
        categoria: "Ropa para dama",
        descripcion: "Conjunto casual perfecto para disfrutar de comodidad y estilo todos los días.",
        imagen: "https://www.coppel.com/blog/wp-content/uploads/2025/12/outfit-de-falda-y-botas.webp"
    },
    {
        id: "3",
        nombre: "Bolso clásico",
        precio: 520,
        categoria: "Accesorios",
        descripcion: "Bolso clásico, práctico y versátil para complementar diferentes estilos.",
        imagen: "https://us.christianlouboutin.com/media/catalog/product/cache/c8e9b72c512eaa31cd76a11d9f425a9e/1/2/1270180917u-1270180917u-hover_image-ecommerce-ss27_must_z_60_patent-lining.jpg"
    },
    {
        id: "4",
        nombre: "Tennis ardidas",
        precio: 890,
        categoria: "Calzado",
        descripcion: "Calzado moderno con un diseño ideal para complementar tu outfit.",
        imagen: "https://dcdn-us.mitiendanube.com/stores/006/517/173/products/chatgpt-image-3-ago-2025-12_18_26-a-m-fd7c2ee904223d8fb617542019384405-1024-1024.webp"
    },
    {
        id: "5",
        nombre: "Blusa elegante",
        precio: 420,
        categoria: "Ropa para dama",
        descripcion: "Blusa elegante con un diseño sencillo y sofisticado.",
        imagen: "https://i.pinimg.com/736x/4e/58/d9/4e58d922b775aa27b019894134530c8b.jpg"
    },
    {
        id: "6",
        nombre: "Bolsa de moda",
        precio: 590,
        categoria: "Accesorios",
        descripcion: "Bolsa de moda con espacio para guardar tus accesorios esenciales.",
        imagen: "https://coachmx.vteximg.com.br/arquivos/ids/249174-400-400/cen85_b4de_1.jpg?v=639193229149670000"
    }
];

// Cargar información del producto
document.addEventListener("DOMContentLoaded", () => {

    const parametros = new URLSearchParams(window.location.search);
    const idProducto = parametros.get("id");

    const producto = productos.find(
        elemento => elemento.id === idProducto
    );

    if (!producto) {
        document.querySelector(".detalle-producto").innerHTML =
            "<h2>Producto no encontrado</h2><a href='productos.html'>Volver al catálogo</a>";
        return;
    }

    // Mostrar información del producto
    const imagen = document.getElementById("imagen-detalle");

    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;

    // Mostrar error si la imagen no existe
    imagen.onerror = () => {
        imagen.alt = "No se pudo cargar la imagen del producto";
        console.error("No se pudo cargar la imagen:", producto.imagen);
    };

    document.getElementById("nombre-detalle").textContent =
        producto.nombre;

    document.getElementById("precio-detalle").textContent =
        `$${producto.precio.toFixed(2)}`;

    document.getElementById("descripcion-detalle").textContent =
        producto.descripcion;

    document.getElementById("categoria-detalle").textContent =
        producto.categoria;

    // Actualizar información del botón
    const boton = document.getElementById("boton-agregar");

    boton.dataset.id = producto.id;
    boton.dataset.nombre = producto.nombre;
    boton.dataset.precio = producto.precio;

});
