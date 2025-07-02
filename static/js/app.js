// Calculadora de ventas de huevos

// Espera a que todo el contenido del DOM esté cargado
// para asegurar que los elementos existen antes de usarlos

document.addEventListener('DOMContentLoaded', function() {
    // --- CALCULADORA DE HUEVOS ---
    let listaHuevos = [];
    const formulario = document.getElementById('formulario-huevos');
    const agregarBtn = document.getElementById('agregar');
    const tipoInput = document.getElementById('tipo');
    const cantidadInput = document.getElementById('cantidad');
    const listaDiv = document.getElementById('lista-huevos');
    const formularioFinal = document.getElementById('formulario-final');
    const frecuenteInput = document.getElementById('frecuente');
    const diaInput = document.getElementById('dia');
    const resultadoDiv = document.getElementById('resultado');
    const precios = { 'A': 500, 'AA': 600, 'AAA': 650 };
    const nombres = { 'A': 'A', 'AA': 'AA', 'AAA': 'AAA' };

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
        document.querySelectorAll('.eliminar-huevo').forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = parseInt(this.getAttribute('data-idx'));
                listaHuevos.splice(idx, 1);
                renderLista();
            });
        });
    }

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

    formularioFinal.addEventListener('submit', function(e) {
        e.preventDefault();
        if (listaHuevos.length === 0) {
            resultadoDiv.textContent = 'Agrega al menos una combinación de huevos.';
            return;
        }
        let cantidadTotal = 0;
        let precioBase = 0;
        listaHuevos.forEach(item => {
            cantidadTotal += item.cantidad;
            precioBase += precios[item.tipo] * item.cantidad;
        });
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
        if (frecuenteInput.checked) {
            precioConDescuento *= 0.975;
        }
        let precioFinal = precioConDescuento;
        const dia = diaInput.value;
        if (["lunes", "martes", "miércoles", "jueves", "viernes"].includes(dia)) {
            precioFinal *= 1.05;
        } else if (dia === "sábado") {
            precioFinal *= 0.95;
        }
        resultadoDiv.textContent = `Total a pagar: $${precioFinal.toLocaleString('es-CO', {minimumFractionDigits: 0})}`;
    });
    renderLista();

    // --- EJERCICIO 2: SERIE MATEMÁTICA ---
    const formSerie = document.getElementById('form-serie');
    const resultadoSerie = document.getElementById('resultado-serie');
    if (formSerie) {
        formSerie.addEventListener('submit', function(e) {
            e.preventDefault();
            const x = parseFloat(document.getElementById('x').value);
            const n = parseInt(document.getElementById('n').value);
            if (isNaN(x) || isNaN(n) || n < 2 || n % 2 !== 0) {
                resultadoSerie.textContent = 'Por favor, ingresa valores válidos (n debe ser par y mayor o igual a 2).';
                return;
            }
            let suma = 0;
            for (let i = 2; i <= n; i += 2) {
                suma += Math.pow(x, i) / i;
            }
            resultadoSerie.textContent = `El resultado de la serie es: ${suma}`;
        });
    }

    // --- EJERCICIO 3: CLASIFICACIÓN DE DEPORTES ---
    const formDeportes = document.getElementById('form-deportes');
    const listaDeportesDiv = document.getElementById('lista-deportes');
    const resultadoDeportes = document.getElementById('resultado-deportes');
    const agregarDeporteBtn = document.getElementById('agregar-deporte');
    const mostrarClasificacionBtn = document.getElementById('mostrar-clasificacion');
    let deportes = [
        { nombre: 'Ajedrez', cantidad: 0 },
        { nombre: 'Atletismo', cantidad: 0 },
        { nombre: 'Fútbol', cantidad: 0 },
        { nombre: 'Gimnasia', cantidad: 0 },
        { nombre: 'Natación', cantidad: 0 }
    ];
    function renderDeportes() {
        let total = deportes.reduce((acc, d) => acc + d.cantidad, 0);
        let html = `<strong>Total asignado: ${total} / 400</strong><ul>`;
        deportes.forEach((dep, idx) => {
            html += `<li>${dep.nombre}: ${dep.cantidad} <button class='eliminar-huevo' data-idx='${idx}'>Quitar</button></li>`;
        });
        html += '</ul>';
        listaDeportesDiv.innerHTML = html;
        document.querySelectorAll('#lista-deportes .eliminar-huevo').forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = parseInt(this.getAttribute('data-idx'));
                deportes[idx].cantidad = 0;
                renderDeportes();
            });
        });
    }
    if (agregarDeporteBtn) {
        agregarDeporteBtn.addEventListener('click', function() {
            const deporte = document.getElementById('deporte').value;
            const cantidad = parseInt(document.getElementById('cantidad-deporte').value);
            if (!deporte || isNaN(cantidad) || cantidad < 1) {
                alert('Por favor, selecciona un deporte y una cantidad válida.');
                return;
            }
            let total = deportes.reduce((acc, d) => acc + d.cantidad, 0);
            if (total + cantidad > 400) {
                alert('No puedes asignar más de 400 personas en total.');
                return;
            }
            let dep = deportes.find(d => d.nombre === deporte);
            dep.cantidad += cantidad;
            renderDeportes();
            formDeportes.reset();
        });
    }
    if (mostrarClasificacionBtn) {
        mostrarClasificacionBtn.addEventListener('click', function() {
            let total = deportes.reduce((acc, d) => acc + d.cantidad, 0);
            if (total !== 400) {
                resultadoDeportes.textContent = 'Debes asignar exactamente 400 personas entre los deportes.';
                return;
            }
            let resumen = deportes.map(d => `${d.nombre}: ${d.cantidad}`).join(' | ');
            resultadoDeportes.textContent = 'Clasificación final: ' + resumen;
        });
    }
    if (listaDeportesDiv) renderDeportes();

    // --- EJERCICIO 4: DÍA DE LA SEMANA (con try-catch) ---
    const formDiaSemana = document.getElementById('form-dia-semana');

    const resultadoDiaSemana = document.getElementById('resultado-dia-semana');

    if (formDiaSemana) {
        formDiaSemana.addEventListener('submit', function(e) {
            e.preventDefault();
            const entrada = document.getElementById('numero-dia').value;
            try {
                let numero = Number(entrada);
                if (isNaN(numero)) {
                    throw new Error('La entrada no es un número.');
                }
                if (numero < 1 || numero > 7) {
                    throw new Error('El número debe estar entre 1 y 7.');
                }
                const semana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
                resultadoDiaSemana.textContent = `El día de la semana es: ${semana[numero - 1]}`;
            } catch (error) {
                resultadoDiaSemana.textContent = 'Error: ' + error.message;
            }
        });
    }
    
    // --- EJERCICIO 5: SUMA DE ARRAY (con try-catch) ---
    const sumasarray = document.getElementById('sumasarray');
    const resultadoSumaArray = document.getElementById('resultado-suma-array');
    
    if (sumasarray) {
        sumasarray.addEventListener('submit', function(e) {
            e.preventDefault();
            const entrada = document.getElementById('array').value;
            try {
                // Convertir la entrada en un array de números
                const numeros = entrada.split(',').map(num => {
                    const n = Number(num.trim());
                    if (isNaN(n)) throw new Error(`"${num}" no es un número válido.`);
                    return n;
                });
                // Sumar los valores del array usando do...while
                let suma = 0;
                let i = 0;
                do {
                    try {
                        suma += numeros[i];
                    } catch (error) {
                        // Este catch es redundante aquí, pero lo dejamos por la consigna
                        console.error(error.message);
                    }
                    i++;
                } while (i < numeros.length);
                resultadoSumaArray.textContent = `La suma del array es: ${suma}`;
            } catch (error) {
                resultadoSumaArray.textContent = 'Error: ' + error.message;
            }
        });
    }

});
