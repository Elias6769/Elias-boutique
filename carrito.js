
// ============================================
// ELIAS'S BOUTIQUE - CARRITO DE COMPRAS
// ============================================

"use strict";

const CLAVE_CARRITO = "carritoElias";

// Obtener productos guardados
const obtenerCarrito = () => {
    return JSON.parse(localStorage.getItem(CLAVE_CARRITO) || "[]");
};

// Guardar productos
const guardarCarrito = (carrito) => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
};

// Actualizar contador del carrito
function actualizarContador() {
    const contador = document.getElementById("contador-carrito");

    if (contador) {
        const cantidad = obtenerCarrito().reduce(
            (total, producto) => total + producto.cantidad,
            0
        );

        contador.textContent = cantidad;
    }
}

// Cerrar ventana del carrito
function cerrarCarrito() {
    document.querySelector(".carrito-overlay")?.remove();
}

// Mostrar carrito
function mostrarCarrito() {
    cerrarCarrito();

    const carrito = obtenerCarrito();

    const overlay = document.createElement("section");
    overlay.className = "carrito-overlay";

    const modal = document.createElement("section");
    modal.className = "carrito-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");

    // Encabezado
    const header = document.createElement("header");
    header.className = "carrito-modal-header";

    const titulo = document.createElement("h2");
    titulo.textContent = "Tu carrito";

    const cerrar = document.createElement("button");
    cerrar.className = "carrito-cerrar";
    cerrar.type = "button";
    cerrar.textContent = "×";
    cerrar.setAttribute("aria-label", "Cerrar carrito");
    cerrar.addEventListener("click", cerrarCarrito);

    header.append(titulo, cerrar);
    modal.appendChild(header);

    // Productos
    let total = 0;

    carrito.forEach((producto, indice) => {
        const fila = document.createElement("article");
        fila.className = "carrito-fila";

        const texto = document.createElement("p");

        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        texto.textContent =
            `${producto.nombre} / ${producto.talla} / ${producto.cantidad} pza(s)`;

        const precio = document.createElement("strong");
        precio.textContent = `$${subtotal.toFixed(2)}`;

        const eliminar = document.createElement("button");
        eliminar.className = "boton-eliminar";
        eliminar.type = "button";
        eliminar.textContent = "Eliminar";

        eliminar.addEventListener("click", () => {
            const carritoActual = obtenerCarrito();

            carritoActual.splice(indice, 1);

            guardarCarrito(carritoActual);
            actualizarContador();
            mostrarCarrito();
        });

        fila.append(texto, precio, eliminar);
        modal.appendChild(fila);
    });

    // Carrito vacío
    if (carrito.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "Tu carrito está vacío.";
        modal.appendChild(mensaje);
    }

    // Total
    const resumen = document.createElement("p");
    resumen.className = "carrito-resumen";
    resumen.textContent = `Total: $${total.toFixed(2)}`;

    modal.appendChild(resumen);

    // Botones
    const acciones = document.createElement("footer");
    acciones.className = "carrito-acciones";

    const seguir = document.createElement("button");
    seguir.className = "boton-seguir";
    seguir.textContent = "Seguir comprando";
    seguir.type = "button";
    seguir.addEventListener("click", cerrarCarrito);

    const vaciar = document.createElement("button");
    vaciar.className = "boton-vaciar";
    vaciar.textContent = "Vaciar carrito";
    vaciar.type = "button";

    vaciar.addEventListener("click", () => {
        guardarCarrito([]);
        actualizarContador();
        mostrarCarrito();
    });

    const pagar = document.createElement("button");
    pagar.className = "boton";
    pagar.textContent = "Finalizar compra";
    pagar.type = "button";
    pagar.disabled = carrito.length === 0;

    pagar.addEventListener("click", () => {
        window.location.href = "checkout.html";
    });

    acciones.append(seguir, vaciar, pagar);
    modal.appendChild(acciones);

    overlay.appendChild(modal);

    // Cerrar al hacer clic fuera
    overlay.addEventListener("click", (evento) => {
        if (evento.target === overlay) {
            cerrarCarrito();
        }
    });

    document.body.appendChild(overlay);
}

// Inicializar funciones
document.addEventListener("DOMContentLoaded", () => {

    actualizarContador();

    // Agregar productos
    document.querySelectorAll(".agregar-carrito").forEach((boton) => {

        boton.addEventListener("click", () => {

            const talla = document.getElementById(
                boton.dataset.talla
            ).value;

            const cantidad = Number(
                document.getElementById(
                    boton.dataset.cantidad
                ).value
            );

            const precio = Number(boton.dataset.precio);

            const carrito = obtenerCarrito();

            const productoExistente = carrito.find((producto) =>
                producto.id === boton.dataset.id &&
                producto.talla === talla
            );

            if (productoExistente) {
                productoExistente.cantidad += cantidad;
            } else {
                carrito.push({
                    id: boton.dataset.id,
                    nombre: boton.dataset.nombre,
                    precio: precio,
                    talla: talla,
                    cantidad: cantidad
                });
            }

            guardarCarrito(carrito);
            actualizarContador();
            mostrarCarrito();
        });

    });

    // Abrir carrito
    document
        .getElementById("abrir-carrito")
        ?.addEventListener("click", mostrarCarrito);

    // Cerrar con Escape
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            cerrarCarrito();
        }
    });

});
