// --- EJERCICIO 1: VANTI ---

// formulario para agregar cliente
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-gas');
    const resultadoDiv = document.getElementById('resultado');
    const agregarBtn = document.getElementById('agregar-cliente');
    const calcularBtn = document.getElementById('calcular-totales');
    const clientesListaDiv = document.getElementById('clientes-lista');

    // array para almacenar clientes
    let clientes = [];

    agregarBtn.addEventListener('click', function() {
        
        // formulario para cuenta, estrato, tipo de servicio y consumo
        const cuenta = document.getElementById('cuenta').value;
        const estrato = parseInt(document.getElementById('estrato').value);
        const tipoServicio = parseInt(document.getElementById('tipo-servicio').value);
        const consumo = parseFloat(document.getElementById('consumo').value);

        if (!cuenta.match(/^\d{6}$/)) { // restricción para que el número de cuenta tenga 6 dígitos
            alert('El número de cuenta debe tener 6 dígitos.');
            return;
        }
        if (isNaN(consumo) || consumo < 0) { // restricción para que el consumo sea un número positivo
            alert('El consumo debe ser un número positivo.');
            return;
        }

        clientes.push({ cuenta, estrato, tipoServicio, consumo }); // agregar cliente a la lista
        mostrarClientes();
        form.reset();
    });

    // calcular facturas usando for
    calcularBtn.addEventListener('click', function() { 
        if (clientes.length === 0) { // restricción para que haya clientes para calcular
            resultadoDiv.innerHTML = '<p>No hay clientes para calcular.</p>';
            return;
        }
        let facturas = '';
        for (let i = 0; i < clientes.length; i++) {
            const c = clientes[i];
            const detalles = calcularFacturaDetalles(c.estrato, c.tipoServicio, c.consumo);
            facturas += `
            <div class="factura">
                <h2>Factura de Gas Natural</h2>
                <p><strong>N° Cuenta:</strong> ${c.cuenta}</p>
                <p><strong>Estrato:</strong> ${c.estrato}</p>
                <p><strong>Tipo de Servicio:</strong> ${tipoServicioTexto(c.tipoServicio)}</p>
                <p><strong>Consumo:</strong> ${c.consumo} m³</p>
                <hr>
                <p><strong>Valor por consumo:</strong> $${detalles.valorConsumo.toLocaleString('es-CO')}</p>
                <p><strong>Cargo fijo:</strong> $${detalles.cargoFijo.toLocaleString('es-CO')}</p>
                <p><strong>Cobro adicional (${detalles.porcentajeAdicional * 100}%):</strong> $${detalles.cobroAdicional.toLocaleString('es-CO')}</p>
                <p><strong>Subtotal:</strong> $${detalles.subtotal.toLocaleString('es-CO')}</p>
                <p><strong>Descuento${detalles.porcentajeDescuento > 0 ? ` (${(detalles.porcentajeDescuento*100).toFixed(0)}%)` : ''}:</strong> -$${detalles.descuento.toLocaleString('es-CO')}</p>
                <hr>
                <h3>Total a Pagar: $${detalles.total.toLocaleString('es-CO')}</h3>
            </div>
            `;
        }
        resultadoDiv.innerHTML = facturas;
    });

    // mostrar clientes agregados usando for
    function mostrarClientes() {
        if (clientes.length === 0) {
            clientesListaDiv.innerHTML = '<p>No hay clientes agregados.</p>';
            return;
        }
        let lista = '<h3>Clientes agregados:</h3><ul>';
        for (let i = 0; i < clientes.length; i++) {
            const c = clientes[i];
            lista += `<li>${c.cuenta} - Estrato ${c.estrato} - ${tipoServicioTexto(c.tipoServicio)} - ${c.consumo} m³</li>`;
        }
        lista += '</ul>';
        clientesListaDiv.innerHTML = lista;
    }

    function tipoServicioTexto(tipo) {
        if (tipo === 1) return 'Doméstico';
        if (tipo === 2) return 'Comercial';
        if (tipo === 3) return 'Industrial';
        return '';
    }
});


// calcular factura usando try-catch
function calcularFacturaDetalles(estrato, tipoServicio, consumo) {
    try {
        // Valor consumo
        let tarifa = 0;
        if (consumo < 35) {
            tarifa = 545;
        } else if (consumo >= 35 && consumo <= 75) {
            tarifa = 600;
        } else if (consumo >= 76 && consumo <= 144) {
            tarifa = 750;
        } else if (consumo >= 145) {
            tarifa = 803;
        }
        let valorConsumo = Math.round(consumo * tarifa);

        // Cargo fijo por estrato usando if-else
        let cargoFijo = 0;
        if (estrato === 1 || estrato === 2) {
            cargoFijo = 15700;
        } else if (estrato === 3 || estrato === 4) {
            cargoFijo = 20200;
        } else if (estrato === 5 || estrato === 6) {
            cargoFijo = 34075;
        } else {
            throw new Error('Estrato no válido');
        }

        // Cobro adicional por tipo de servicio usando if-else
        let porcentajeAdicional = 0;
        if (tipoServicio === 1) {
            porcentajeAdicional = 0.40;
        } else if (tipoServicio === 2) {
            porcentajeAdicional = 0.55;
        } else if (tipoServicio === 3) {
            porcentajeAdicional = 0.70;
        } else {
            throw new Error('Tipo de servicio no válido');
        }

        let subtotal = valorConsumo + cargoFijo;
        let cobroAdicional = Math.round(subtotal * porcentajeAdicional);
        let subtotalConAdicional = subtotal + cobroAdicional;

        // Descuentos
        let descuento = 0;
        let porcentajeDescuento = 0;
        if (tipoServicio === 1 && consumo <= 30) {
            porcentajeDescuento = 0.25;
            descuento = Math.round(subtotalConAdicional * porcentajeDescuento);
        } else if (tipoServicio === 2 && consumo >= 30 && consumo <= 75) {
            porcentajeDescuento = 0.17;
            descuento = Math.round(subtotalConAdicional * porcentajeDescuento);
        } else if (tipoServicio === 3) {
            porcentajeDescuento = 0.07;
            descuento = Math.round(subtotalConAdicional * porcentajeDescuento);
        }
        let total = subtotalConAdicional - descuento;

        return {
            valorConsumo,
            cargoFijo,
            porcentajeAdicional,
            cobroAdicional,
            subtotal,
            descuento,
            porcentajeDescuento,
            total
        };
    } catch (error) {
        return {
            error: true,
            mensaje: error.message
        };
    }
}
