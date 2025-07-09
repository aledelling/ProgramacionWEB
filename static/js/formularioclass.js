// Clase para representar un vehículo en el parqueadero
class Vehiculo {
    constructor(tipo, placa, horaIngreso, horaSalida) {
        this.tipo = tipo;
        this.placa = placa;
        this.horaIngreso = horaIngreso;
        this.horaSalida = horaSalida;
        this.tiempoMinutos = this.calcularTiempo();
        this.tarifaPorMinuto = this.obtenerTarifa();
        this.valorSinDescuento = this.calcularValorSinDescuento();
        this.descuento = this.calcularDescuento();
        this.valorFinal = this.calcularValorFinal();
        this.ultimoDigito = this.obtenerUltimoDigito();
        this.pagado = false; // Nuevo atributo para indicar si el vehículo ya fue pagado
        this.fechaPago = null; // Nuevo atributo para registrar la fecha de pago
    }

    // Método para calcular tiempo en minutos
    calcularTiempo() {
        const ingreso = new Date(`2024-01-01 ${this.horaIngreso}`);
        const salida = new Date(`2024-01-01 ${this.horaSalida}`);
        
        if (salida < ingreso) {
            salida.setDate(salida.getDate() + 1); // Si pasa de medianoche
        }
        
        const diferenciaMs = salida - ingreso;
        return Math.ceil(diferenciaMs / (1000 * 60)); // Convertir a minutos
    }

    // Método para obtener tarifa por minuto
    obtenerTarifa() {
        return this.tipo === 'Automóvil' ? 110 : 80;
    }

    // Método para calcular valor sin descuento
    calcularValorSinDescuento() {
        return this.tiempoMinutos * this.tarifaPorMinuto;
    }

    // Método para obtener último dígito de la placa
    obtenerUltimoDigito() {
        const numeros = this.placa.replace(/\D/g, ''); // Solo números
        return numeros ? parseInt(numeros.slice(-1)) : 0;
    }

    // Método para calcular descuento por pico y placa
    calcularDescuento() {
        const fecha = new Date();
        const diaSemana = fecha.getDay(); // 0 = Domingo, 1 = Lunes, etc.
        
        // Restricción: Lunes (1) y Martes (2) - dígitos 1,2,3,4,5
        // Miércoles (3) y Jueves (4) - dígitos 6,7,8,9,0
        if (diaSemana === 1 || diaSemana === 2) { // Lunes o Martes
            if (this.ultimoDigito >= 1 && this.ultimoDigito <= 5) {
                return this.valorSinDescuento * 0.25;
            }
        } else if (diaSemana === 3 || diaSemana === 4) { // Miércoles o Jueves
            if (this.ultimoDigito >= 6 && this.ultimoDigito <= 9 || this.ultimoDigito === 0) {
                return this.valorSinDescuento * 0.25;
            }
        }
        
        return 0;
    }

    // Método para calcular valor final con ajuste a múltiplo de 50
    calcularValorFinal() {
        const valorConDescuento = this.valorSinDescuento - this.descuento;
        return Math.ceil(valorConDescuento / 50) * 50; // Ajustar a múltiplo de 50
    }

    // Método para obtener información completa
    obtenerInformacion() {
        return {
            tipo: this.tipo,
            placa: this.placa,
            horaIngreso: this.horaIngreso,
            horaSalida: this.horaSalida,
            tiempoMinutos: this.tiempoMinutos,
            tarifaPorMinuto: this.tarifaPorMinuto,
            valorSinDescuento: this.valorSinDescuento,
            descuento: this.descuento,
            valorFinal: this.valorFinal,
            ultimoDigito: this.ultimoDigito
        };
    }
}

// Clase para manejar el cambio
class CalculadoraCambio {
    constructor() {
        this.denominaciones = [
            { valor: 50000, nombre: 'Billete de $50.000' },
            { valor: 20000, nombre: 'Billete de $20.000' },
            { valor: 10000, nombre: 'Billete de $10.000' },
            { valor: 5000, nombre: 'Billete de $5.000' },
            { valor: 2000, nombre: 'Billete de $2.000' },
            { valor: 1000, nombre: 'Billete de $1.000' },
            { valor: 500, nombre: 'Moneda de $500' },
            { valor: 200, nombre: 'Moneda de $200' },
            { valor: 100, nombre: 'Moneda de $100' },
            { valor: 50, nombre: 'Moneda de $50' }
        ];
    }

    // Método para calcular el cambio
    calcularCambio(valorAPagar, dineroEntregado) {
        if (dineroEntregado < valorAPagar) {
            return {
                error: true,
                mensaje: 'El dinero entregado es insuficiente para pagar el servicio.'
            };
        }

        let cambio = dineroEntregado - valorAPagar;
        const desglose = [];

        for (const denominacion of this.denominaciones) {
            if (cambio >= denominacion.valor) {
                const cantidad = Math.floor(cambio / denominacion.valor);
                desglose.push({
                    denominacion: denominacion.nombre,
                    cantidad: cantidad,
                    subtotal: cantidad * denominacion.valor
                });
                cambio = cambio % denominacion.valor;
            }
        }

        return {
            error: false,
            cambioTotal: dineroEntregado - valorAPagar,
            desglose: desglose,
            valorAPagar: valorAPagar,
            dineroEntregado: dineroEntregado
        };
    }
}

// Clase para manejar el sistema de parqueadero
class SistemaParqueadero {
    constructor() {
        this.vehiculos = [];
        this.vehiculoActual = null;
        this.vehiculoSeleccionado = null;
        this.calculadoraCambio = new CalculadoraCambio();
        this.totalIngresos = 0;
    }

    // Método para registrar un vehículo
    registrarVehiculo(tipo, placa, horaIngreso, horaSalida) {
        const vehiculo = new Vehiculo(tipo, placa, horaIngreso, horaSalida);
        this.vehiculos.push(vehiculo);
        this.vehiculoActual = vehiculo;
        this.actualizarSelectorVehiculos();
        this.actualizarEstadisticasDashboard();
        return vehiculo;
    }

    // Método para seleccionar vehículo por placa
    seleccionarVehiculoPorPlaca(placa) {
        this.vehiculoSeleccionado = this.vehiculos.find(v => v.placa === placa);
        return this.vehiculoSeleccionado;
    }

    // Método para obtener vehículos disponibles
    obtenerVehiculosDisponibles() {
        return this.vehiculos.map(v => ({
            placa: v.placa,
            tipo: v.tipo,
            horaIngreso: v.horaIngreso,
            horaSalida: v.horaSalida,
            valorFinal: v.valorFinal
        }));
    }

    // Método para actualizar el selector de vehículos
    actualizarSelectorVehiculos() {
        const selector = document.getElementById('placaSeleccionada');
        if (!selector) return;

        // Mantener la opción por defecto
        selector.innerHTML = '<option value="">Seleccione un vehículo...</option>';
        
        // Agregar solo vehículos pendientes de pago
        const vehiculosPendientes = this.obtenerVehiculosPendientes();
        vehiculosPendientes.forEach(vehiculo => {
            const option = document.createElement('option');
            option.value = vehiculo.placa;
            option.textContent = `${vehiculo.placa} - ${vehiculo.tipo} ($${vehiculo.valorFinal.toLocaleString()})`;
            selector.appendChild(option);
        });
    }

    // Método para actualizar estadísticas del dashboard
    actualizarEstadisticasDashboard() {
        const stats = this.obtenerEstadisticas();
        
        const totalVehiculosEl = document.getElementById('totalVehiculos');
        const vehiculosPagadosEl = document.getElementById('vehiculosPagados');
        const vehiculosPendientesEl = document.getElementById('vehiculosPendientes');
        const totalIngresosEl = document.getElementById('totalIngresos');
        const totalDescuentosEl = document.getElementById('totalDescuentos');
        
        if (totalVehiculosEl) totalVehiculosEl.textContent = stats.totalVehiculos;
        if (vehiculosPagadosEl) vehiculosPagadosEl.textContent = stats.vehiculosPagados;
        if (vehiculosPendientesEl) vehiculosPendientesEl.textContent = stats.vehiculosPendientes;
        if (totalIngresosEl) totalIngresosEl.textContent = `$${stats.totalIngresos.toLocaleString()}`;
        if (totalDescuentosEl) totalDescuentosEl.textContent = `$${stats.totalDescuentos.toLocaleString()}`;
    }

    // Método para procesar pago
    procesarPago(dineroEntregado) {
        if (!this.vehiculoSeleccionado) {
            return { error: true, mensaje: 'No hay vehículo seleccionado.' };
        }

        const resultado = this.calculadoraCambio.calcularCambio(
            this.vehiculoSeleccionado.valorFinal, 
            dineroEntregado
        );

        if (!resultado.error) {
            this.totalIngresos += this.vehiculoSeleccionado.valorFinal;
            // Marcar el vehículo como pagado
            this.marcarVehiculoComoPagado(this.vehiculoSeleccionado.placa);
            this.vehiculoSeleccionado = null;
            this.actualizarSelectorVehiculos();
            this.actualizarEstadisticasDashboard();
        }

        return resultado;
    }

    // Método para obtener vehículos pagados
    obtenerVehiculosPagados() {
        return this.vehiculos.filter(v => v.pagado);
    }

    // Método para obtener vehículos pendientes
    obtenerVehiculosPendientes() {
        return this.vehiculos.filter(v => !v.pagado);
    }

    // Método para marcar vehículo como pagado
    marcarVehiculoComoPagado(placa) {
        const vehiculo = this.vehiculos.find(v => v.placa === placa);
        if (vehiculo) {
            vehiculo.pagado = true;
            vehiculo.fechaPago = new Date().toLocaleString();
        }
    }

    // Método para obtener estadísticas
    obtenerEstadisticas() {
        const totalVehiculos = this.vehiculos.length;
        const vehiculosPagados = this.vehiculos.filter(v => v.pagado).length;
        const vehiculosPendientes = this.vehiculos.filter(v => !v.pagado).length;
        const automoviles = this.vehiculos.filter(v => v.tipo === 'Automóvil').length;
        const motos = this.vehiculos.filter(v => v.tipo === 'Moto').length;
        const totalDescuentos = this.vehiculos.reduce((sum, v) => sum + v.descuento, 0);

        return {
            totalVehiculos,
            vehiculosPagados,
            vehiculosPendientes,
            automoviles,
            motos,
            totalIngresos: this.totalIngresos,
            totalDescuentos
        };
    }

    // Método para validar placa
    validarPlaca(placa) {
        return placa.length >= 3 && /^[A-Z0-9]+$/.test(placa);
    }

    // Método para validar hora
    validarHora(hora) {
        const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return regex.test(hora);
    }
}

// Instancia global del sistema
const sistemaParqueadero = new SistemaParqueadero();

// Funciones para manejar el formulario HTML
function registrarVehiculo() {
    const tipo = document.getElementById('tipo').value;
    const placa = document.getElementById('placa').value.toUpperCase();
    const horaIngreso = document.getElementById('horaIngreso').value;
    const horaSalida = document.getElementById('horaSalida').value;

    // Validaciones
    if (!tipo) {
        alert('Por favor seleccione el tipo de vehículo.');
        return;
    }

    if (!sistemaParqueadero.validarPlaca(placa)) {
        alert('Por favor ingrese una placa válida (mínimo 3 caracteres, solo letras y números).');
        return;
    }

    if (!sistemaParqueadero.validarHora(horaIngreso)) {
        alert('Por favor ingrese una hora de ingreso válida (formato HH:MM).');
        return;
    }

    if (!sistemaParqueadero.validarHora(horaSalida)) {
        alert('Por favor ingrese una hora de salida válida (formato HH:MM).');
        return;
    }

    if (horaIngreso === horaSalida) {
        alert('La hora de ingreso y salida no pueden ser iguales.');
        return;
    }

    // Verificar si la placa ya existe
    const vehiculoExistente = sistemaParqueadero.vehiculos.find(v => v.placa === placa);
    if (vehiculoExistente) {
        alert('Ya existe un vehículo registrado con esta placa.');
        return;
    }

    const vehiculo = sistemaParqueadero.registrarVehiculo(tipo, placa, horaIngreso, horaSalida);
    mostrarInformacionVehiculo(vehiculo);
    limpiarFormularioVehiculo();
}

// Función para seleccionar vehículo del dropdown
function seleccionarVehiculo() {
    const placaSeleccionada = document.getElementById('placaSeleccionada').value;
    const btnProcesarPago = document.getElementById('btnProcesarPago');
    const infoVehiculo = document.getElementById('infoVehiculoSeleccionado');

    console.log('Seleccionando vehículo:', placaSeleccionada);

    if (!placaSeleccionada) {
        // No hay vehículo seleccionado
        btnProcesarPago.disabled = true;
        infoVehiculo.style.display = 'none';
        console.log('No hay vehículo seleccionado, botón deshabilitado');
        return;
    }

    const vehiculo = sistemaParqueadero.seleccionarVehiculoPorPlaca(placaSeleccionada);
    console.log('Vehículo encontrado:', vehiculo);
    
    if (vehiculo) {
        mostrarInformacionVehiculoSeleccionado(vehiculo);
        btnProcesarPago.disabled = false;
        console.log('Vehículo seleccionado, botón habilitado');
    } else {
        btnProcesarPago.disabled = true;
        infoVehiculo.style.display = 'none';
        console.log('Vehículo no encontrado, botón deshabilitado');
    }
}

// Función para mostrar información del vehículo seleccionado
function mostrarInformacionVehiculoSeleccionado(vehiculo) {
    const infoVehiculo = document.getElementById('infoVehiculoSeleccionado');
    
    if (!infoVehiculo) {
        console.error('Elemento infoVehiculoSeleccionado no encontrado');
        return;
    }
    
    const infoTipo = document.getElementById('infoTipo');
    const infoPlaca = document.getElementById('infoPlaca');
    const infoHoraIngreso = document.getElementById('infoHoraIngreso');
    const infoHoraSalida = document.getElementById('infoHoraSalida');
    const infoTiempo = document.getElementById('infoTiempo');
    const infoValorPagar = document.getElementById('infoValorPagar');
    
    if (infoTipo) infoTipo.textContent = vehiculo.tipo;
    if (infoPlaca) infoPlaca.textContent = vehiculo.placa;
    if (infoHoraIngreso) infoHoraIngreso.textContent = vehiculo.horaIngreso;
    if (infoHoraSalida) infoHoraSalida.textContent = vehiculo.horaSalida;
    if (infoTiempo) infoTiempo.textContent = `${vehiculo.tiempoMinutos} minutos`;
    if (infoValorPagar) infoValorPagar.textContent = `$${vehiculo.valorFinal.toLocaleString()}`;
    
    infoVehiculo.style.display = 'block';
    console.log('Información del vehículo mostrada:', vehiculo);
}

function procesarPago() {
    console.log('Iniciando procesamiento de pago...');
    
    const dineroEntregado = parseFloat(document.getElementById('dineroEntregado').value);
    console.log('Dinero entregado:', dineroEntregado);
    
    if (!dineroEntregado || dineroEntregado <= 0) {
        alert('Por favor ingrese un monto válido.');
        console.log('Monto inválido');
        return;
    }

    if (!sistemaParqueadero.vehiculoSeleccionado) {
        alert('Por favor seleccione un vehículo para procesar el pago.');
        console.log('No hay vehículo seleccionado');
        return;
    }

    console.log('Procesando pago para vehículo:', sistemaParqueadero.vehiculoSeleccionado);
    const resultado = sistemaParqueadero.procesarPago(dineroEntregado);
    console.log('Resultado del pago:', resultado);
    
    mostrarResultadoPago(resultado);
    
    // Limpiar formulario de pago
    document.getElementById('dineroEntregado').value = '';
    document.getElementById('placaSeleccionada').value = '';
    document.getElementById('btnProcesarPago').disabled = true;
    document.getElementById('infoVehiculoSeleccionado').style.display = 'none';
    
    console.log('Formulario de pago limpiado');
}

function mostrarInformacionVehiculo(vehiculo) {
    const info = vehiculo.obtenerInformacion();
    const resultadoDiv = document.getElementById('resultado');
    
    const fecha = new Date();
    const diaSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][fecha.getDay()];
    
    let descuentoInfo = '';
    if (info.descuento > 0) {
        descuentoInfo = `<p><strong>Descuento:</strong> $${info.descuento.toLocaleString()} (25% pico y placa)</p>`;
    } else {
        descuentoInfo = `<p><strong>Descuento:</strong> $0 (Sin restricción)</p>`;
    }
    
    resultadoDiv.innerHTML = `
        <h3>📋 Información del Vehículo</h3>
        <div class="registro-item">
            <h4>${info.placa} - ${info.tipo}</h4>
            <div class="registro-details">
                <p><strong>Horario:</strong> ${info.horaIngreso} - ${info.horaSalida}</p>
                <p><strong>Tiempo:</strong> ${info.tiempoMinutos} min</p>
                <p><strong>Tarifa:</strong> $${info.tarifaPorMinuto}/min</p>
                <p><strong>Valor sin descuento:</strong> $${info.valorSinDescuento.toLocaleString()}</p>
                ${descuentoInfo}
                <p><strong>Valor final:</strong> $${info.valorFinal.toLocaleString()}</p>
                <p><strong>Último dígito:</strong> ${info.ultimoDigito}</p>
            </div>
        </div>
    `;
}

function mostrarResultadoPago(resultado) {
    const resultadoDiv = document.getElementById('resultado');
    
    if (resultado.error) {
        resultadoDiv.innerHTML = `
            <h3>❌ Error en el Pago</h3>
            <div class="registro-item" style="border-left: 4px solid #dc3545;">
                <p><strong>${resultado.mensaje}</strong></p>
            </div>
        `;
        return;
    }

    let desgloseHTML = '<h4>Desglose del cambio:</h4><ul>';
    resultado.desglose.forEach(item => {
        desgloseHTML += `<li>${item.cantidad} ${item.denominacion} = $${item.subtotal.toLocaleString()}</li>`;
    });
    desgloseHTML += '</ul>';

    resultadoDiv.innerHTML = `
        <h3>✅ Pago Procesado Exitosamente</h3>
        <div class="registro-item" style="border-left: 4px solid #28a745;">
            <h4>Resumen del Pago</h4>
            <div class="registro-details">
                <p><strong>Valor a pagar:</strong> $${resultado.valorAPagar.toLocaleString()}</p>
                <p><strong>Dinero entregado:</strong> $${resultado.dineroEntregado.toLocaleString()}</p>
                <p><strong>Cambio total:</strong> $${resultado.cambioTotal.toLocaleString()}</p>
            </div>
            ${desgloseHTML}
        </div>
    `;
}

function limpiarFormularioVehiculo() {
    document.getElementById('tipo').value = '';
    document.getElementById('placa').value = '';
    document.getElementById('horaIngreso').value = '';
    document.getElementById('horaSalida').value = '';
    document.getElementById('placaDiv').style.display = 'none';
}

function mostrarTodosRegistros() {
    const registros = sistemaParqueadero.obtenerVehiculosPendientes(); // Mostrar solo vehículos pendientes
    const resultado = document.getElementById('resultado');
    
    if (registros.length === 0) {
        resultado.innerHTML = '<p>No hay vehículos pendientes de pago.</p>';
        return;
    }

    let html = '<h3>📋 Vehículos Pendientes de Pago</h3>';
    html += '<div class="registros-grid">';
    
    registros.forEach((vehiculo, index) => {
        const info = vehiculo.obtenerInformacion();
        html += `
            <div class="registro-item">
                <h4>${vehiculo.placa} - ${vehiculo.tipo}</h4>
                <div class="registro-details">
                    <p><strong>Horario:</strong> ${info.horaIngreso} - ${info.horaSalida}</p>
                    <p><strong>Tiempo:</strong> ${info.tiempoMinutos} min</p>
                    <p><strong>Valor:</strong> $${info.valorFinal.toLocaleString()}</p>
                    <p><strong>Descuento:</strong> $${info.descuento.toLocaleString()}</p>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    resultado.innerHTML = html;
}

function mostrarEstadisticas() {
    const stats = sistemaParqueadero.obtenerEstadisticas();
    const resultado = document.getElementById('resultado');
    
    let html = '<h3>📈 Estadísticas Detalladas</h3>';
    html += '<div class="stats-grid">';
    html += `
        <div class="stat-item">
            <h4>🚗 Vehículos</h4>
            <p><strong>Total:</strong> ${stats.totalVehiculos}</p>
            <p><strong>Pagados:</strong> ${stats.vehiculosPagados}</p>
            <p><strong>Pendientes:</strong> ${stats.vehiculosPendientes}</p>
            <p><strong>Automóviles:</strong> ${stats.automoviles}</p>
            <p><strong>Motos:</strong> ${stats.motos}</p>
        </div>
        <div class="stat-item">
            <h4>💰 Ingresos</h4>
            <p><strong>Total:</strong> $${stats.totalIngresos.toLocaleString()}</p>
            <p><strong>Descuentos:</strong> $${stats.totalDescuentos.toLocaleString()}</p>
        </div>
        <div class="stat-item">
            <h4>ℹ️ Tarifas</h4>
            <p><strong>Automóvil:</strong> $110/min</p>
            <p><strong>Moto:</strong> $80/min</p>
            <p><strong>Pico y Placa:</strong> 25% descuento</p>
        </div>
    `;
    html += '</div>';
    
    resultado.innerHTML = html;
}

function mostrarHistorialCompleto() {
    const vehiculosPagados = sistemaParqueadero.obtenerVehiculosPagados();
    const vehiculosPendientes = sistemaParqueadero.obtenerVehiculosPendientes();
    const resultado = document.getElementById('resultado');
    
    let html = '<h3>📋 Historial Completo</h3>';
    
    // Sección de vehículos pagados
    if (vehiculosPagados.length > 0) {
        html += '<h4>✅ Vehículos Pagados</h4>';
        html += '<div class="registros-grid">';
        vehiculosPagados.forEach((vehiculo, index) => {
            const info = vehiculo.obtenerInformacion();
            html += `
                <div class="registro-item" style="border-left: 4px solid #28a745;">
                    <h4>${vehiculo.placa} - ${vehiculo.tipo}</h4>
                    <div class="registro-details">
                        <p><strong>Horario:</strong> ${info.horaIngreso} - ${info.horaSalida}</p>
                        <p><strong>Tiempo:</strong> ${info.tiempoMinutos} min</p>
                        <p><strong>Valor:</strong> $${info.valorFinal.toLocaleString()}</p>
                        <p><strong>Pago:</strong> ${vehiculo.fechaPago}</p>
                    </div>
                </div>
            `;
        });
        html += '</div>';
    }
    
    // Sección de vehículos pendientes
    if (vehiculosPendientes.length > 0) {
        html += '<h4>⏳ Vehículos Pendientes</h4>';
        html += '<div class="registros-grid">';
        vehiculosPendientes.forEach((vehiculo, index) => {
            const info = vehiculo.obtenerInformacion();
            html += `
                <div class="registro-item" style="border-left: 4px solid #ffc107;">
                    <h4>${vehiculo.placa} - ${vehiculo.tipo}</h4>
                    <div class="registro-details">
                        <p><strong>Horario:</strong> ${info.horaIngreso} - ${info.horaSalida}</p>
                        <p><strong>Tiempo:</strong> ${info.tiempoMinutos} min</p>
                        <p><strong>Valor:</strong> $${info.valorFinal.toLocaleString()}</p>
                        <p><strong>Estado:</strong> Pendiente</p>
                    </div>
                </div>
            `;
        });
        html += '</div>';
    }
    
    if (vehiculosPagados.length === 0 && vehiculosPendientes.length === 0) {
        html += '<p>No hay vehículos registrados.</p>';
    }
    
    resultado.innerHTML = html;
}

// Función para mostrar/ocultar campo de placa según tipo de vehículo
function togglePlaca() {
    const tipo = document.getElementById('tipo').value;
    const placaDiv = document.getElementById('placaDiv');
    
    if (tipo) {
        placaDiv.style.display = 'block';
    } else {
        placaDiv.style.display = 'none';
        document.getElementById('placa').value = '';
    }
}

// Función de inicialización
function inicializarDashboard() {
    console.log('Inicializando dashboard...');
    
    // Verificar que todos los elementos necesarios estén presentes
    const elementosRequeridos = [
        'tipo', 'placa', 'horaIngreso', 'horaSalida',
        'placaSeleccionada', 'dineroEntregado', 'btnProcesarPago',
        'infoVehiculoSeleccionado', 'infoTipo', 'infoPlaca', 
        'infoTiempo', 'infoValorPagar', 'resultado'
    ];
    
    const elementosFaltantes = [];
    elementosRequeridos.forEach(id => {
        const elemento = document.getElementById(id);
        if (!elemento) {
            elementosFaltantes.push(id);
        }
    });
    
    if (elementosFaltantes.length > 0) {
        console.error('Elementos faltantes:', elementosFaltantes);
        alert('Error: Algunos elementos del dashboard no se encontraron. Por favor, recarga la página.');
        return;
    }
    
    // Configurar estado inicial
    document.getElementById('btnProcesarPago').disabled = true;
    document.getElementById('infoVehiculoSeleccionado').style.display = 'none';
    
    // Actualizar estadísticas iniciales
    sistemaParqueadero.actualizarEstadisticasDashboard();
    
    console.log('Dashboard inicializado correctamente');
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarDashboard);
} else {
    inicializarDashboard();
}