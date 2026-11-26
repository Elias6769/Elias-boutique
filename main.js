
"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. IDENTIFICAR LA PÁGINA ACTUAL
    // ==========================================

    const paginaActual = window.location.pathname
        .split("/")
        .pop() || "index.html";

    const enlaces = document.querySelectorAll(".navegacion a");

    enlaces.forEach(enlace => {
        const destino = enlace.getAttribute("href");

        if (destino === paginaActual) {
            enlace.classList.add("activo");
            enlace.setAttribute("aria-current", "page");
        } else {
            enlace.classList.remove("activo");
            enlace.removeAttribute("aria-current");
        }
    });


    // ==========================================
    // 2. MENÚ HAMBURGUESA
    // ==========================================

    const botonMenu = document.getElementById("boton-menu");
    const menuPrincipal = document.getElementById("menu-principal");

    if (botonMenu && menuPrincipal) {

        botonMenu.addEventListener("click", () => {
            const abierto = menuPrincipal.classList.toggle("menu-abierto");

            botonMenu.textContent = abierto ? "×" : "☰";
            botonMenu.setAttribute("aria-expanded", abierto);
            botonMenu.setAttribute(
                "aria-label",
                abierto ? "Cerrar menú" : "Abrir menú"
            );
        });

        menuPrincipal.querySelectorAll("a").forEach(enlace => {
            enlace.addEventListener("click", () => {
                menuPrincipal.classList.remove("menu-abierto");
                botonMenu.textContent = "☰";
                botonMenu.setAttribute("aria-expanded", "false");
                botonMenu.setAttribute("aria-label", "Abrir menú");
            });
        });

        document.addEventListener("keydown", evento => {
            if (evento.key === "Escape") {
                menuPrincipal.classList.remove("menu-abierto");
                botonMenu.textContent = "☰";
                botonMenu.setAttribute("aria-expanded", "false");
                botonMenu.setAttribute("aria-label", "Abrir menú");
            }
        });
    }


    // ==========================================
    // 3. VALIDACIÓN DEL FORMULARIO DE CONTACTO
    // ==========================================

    const formularioContacto = document.getElementById("formulario-contacto");

    if (formularioContacto) {

        const nombre = document.getElementById("nombre");
        const correo = document.getElementById("correo");
        const telefono = document.getElementById("telefono");
        const motivo = document.getElementById("motivo");
        const mensaje = document.getElementById("mensaje");

        const mensajeContacto = document.getElementById("mensaje-contacto");

        const campos = [nombre, correo, telefono, motivo, mensaje];

        // Crear espacios para errores
        campos.forEach(campo => {
            const error = document.createElement("small");

            error.className = "campo-error";
            error.id = "error-" + campo.id;

            campo.insertAdjacentElement("afterend", error);
        });


        // Mostrar errores
        function mostrarError(campo, texto) {
            campo.classList.add("campo-invalido");

            document.getElementById(
                "error-" + campo.id
            ).textContent = texto;
        }


        // Limpiar errores
        function limpiarError(campo) {
            campo.classList.remove("campo-invalido");

            document.getElementById(
                "error-" + campo.id
            ).textContent = "";
        }


        // Validar cada campo
        function validarCampo(campo) {

            limpiarError(campo);

            if (campo.value.trim() === "") {
                mostrarError(campo, "Este campo es obligatorio.");
                return false;
            }

            if (campo.id === "nombre" &&
                campo.value.trim().length < 3) {

                mostrarError(campo, "Escribe al menos 3 caracteres.");
                return false;
            }

            if (campo.id === "correo") {

                const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!expresionCorreo.test(campo.value.trim())) {
                    mostrarError(campo, "Ingresa un correo válido.");
                    return false;
                }
            }

            if (campo.id === "telefono") {

                const expresionTelefono = /^[0-9]{10}$/;

                if (!expresionTelefono.test(campo.value.trim())) {
                    mostrarError(
                        campo,
                        "El teléfono debe contener exactamente 10 números."
                    );

                    return false;
                }
            }

            if (campo.id === "mensaje" &&
                campo.value.trim().length < 10) {

                mostrarError(
                    campo,
                    "Escribe un mensaje de al menos 10 caracteres."
                );

                return false;
            }

            return true;
        }


        // Validación mientras se escribe
        campos.forEach(campo => {

            campo.addEventListener("input", () => {
                validarCampo(campo);
            });

            campo.addEventListener("change", () => {
                validarCampo(campo);
            });

        });


        // Validación al enviar el formulario
        formularioContacto.addEventListener("submit", event => {

            event.preventDefault();

            let formularioValido = true;

            campos.forEach(campo => {

                if (!validarCampo(campo)) {
                    formularioValido = false;
                }

            });

            if (!formularioValido) {

                mensajeContacto.textContent =
                    "Revisa los campos marcados antes de continuar.";

                mensajeContacto.style.color = "#b00020";

                return;
            }

            mensajeContacto.textContent =
                "¡Formulario validado correctamente! Esta demostración no envía datos a un servidor.";

            mensajeContacto.style.color = "#218838";

            formularioContacto.reset();

            campos.forEach(campo => {
                limpiarError(campo);
            });

        });

    }


    // ==========================================
    // 4. CONFIGURACIÓN DE BOTONES
    // ==========================================

    const botones = document.querySelectorAll("button:not([type])");

    botones.forEach(boton => {
        boton.setAttribute("type", "button");
    });


    console.log("Elias's Boutique: main.js cargado correctamente.");
    
});