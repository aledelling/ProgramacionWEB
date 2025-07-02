// Calculadora de ventas de huevos

// Espera a que todo el contenido del DOM esté cargado
// para asegurar que los elementos existen antes de usarlos

document.addEventListener('DOMContentLoaded', function() {
    // Array para almacenar las combinaciones de huevos
    let listaHuevos = [];

    // Obtiene los elementos del DOM
    const formulario = document.getElementById('formulario-huevos');
    const agregarBtn = document.getElementById('agregar');
    const tipoInput = document.getElementById('tipo');
    const cantidadInput = document.getElementById('cantidad');
    const listaDiv = document.getElementById('lista-huevos');
    const formularioFinal = document.getElementById('formulario-final');
    const frecuenteInput = document.getElementById('frecuente');
    const diaInput = document.getElementById('dia');
    const resultadoDiv = document.getElementById('resultado');

    // Precios por tipo
    const precios = { 'A': 500, 'AA': 600, 'AAA': 650 };
    const nombres = { 'A': 'A', 'AA': 'AA', 'AAA': 'AAA' };

    // Función para renderizar la lista de huevos agregados
    function renderLista() {
        if (listaHuevos.length === 0) {
            listaDiv.innerHTML = '<em>No has agregado huevos aún.</em>';
            return;
        }
        let html = '<ul>';
        listaHuevos.forEach((item, idx) => {
            html += `<li>${item.cantidad} huevo(s) tipo ${nombres[item.tipo]} ($${precios[item.tipo]} c/u)
                <button class='eliminar-huevo' data-idx='${idx}'>Eliminar</button></li>`;
        });
        html += '</ul>';
        listaDiv.innerHTML = html;
        // Agregar eventos a los botones de eliminar
        document.querySelectorAll('.eliminar-huevo').forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = parseInt(this.getAttribute('data-idx'));
                listaHuevos.splice(idx, 1);
                renderLista();
            });
        });
    }

    // Evento para agregar una combinación de huevos
    agregarBtn.addEventListener('click', function() {
        const tipo = tipoInput.value;
        const cantidad = parseInt(cantidadInput.value);
        if (!tipo || isNaN(cantidad) || cantidad < 1) {
            alert('Por favor, selecciona un tipo y una cantidad válida.');
            return;
        }
        listaHuevos.push({ tipo, cantidad });
        renderLista();
        formulario.reset();
        tipoInput.focus();
    });

    // Evento para calcular el total considerando todas las combinaciones
    formularioFinal.addEventListener('submit', function(e) {
        e.preventDefault();
        if (listaHuevos.length === 0) {
            resultadoDiv.textContent = 'Agrega al menos una combinación de huevos.';
            return;
        }
        // Sumar la cantidad total y el precio base
        let cantidadTotal = 0;
        let precioBase = 0;
        listaHuevos.forEach(item => {
            cantidadTotal += item.cantidad;
            precioBase += precios[item.tipo] * item.cantidad;
        });

        // Descuento por cantidad total
        let descuento = 0;
        if (cantidadTotal >= 30 && cantidadTotal <= 45) {
            descuento = 0.10;
        } else if (cantidadTotal >= 46 && cantidadTotal <= 70) {
            descuento = 0.15;
        } else if (cantidadTotal >= 71 && cantidadTotal <= 100) {
            descuento = 0.20;
        } else if (cantidadTotal > 100) {
            descuento = 0.25;
        }
        let precioConDescuento = precioBase * (1 - descuento);

        // Descuento adicional por cliente frecuente
        if (frecuenteInput.checked) {
            precioConDescuento *= 0.975;
        }

        // Ajuste por día de la semana
        let precioFinal = precioConDescuento;
        const dia = diaInput.value;
        if (["lunes", "martes", "miércoles", "jueves", "viernes"].includes(dia)) {
            precioFinal *= 1.05;
        } else if (dia === "sábado") {
            precioFinal *= 0.95;
        }
        // Domingo no cambia

        resultadoDiv.textContent = `Total a pagar: $${precioFinal.toLocaleString('es-CO', {minimumFractionDigits: 0})}`;
    });

    // Render inicial
    renderLista();
});
