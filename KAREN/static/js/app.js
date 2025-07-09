document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('consumoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const numeroCuenta = document.getElementById('numeroCuenta').value;
        const estrato = parseInt(document.getElementById('estrato').value);
        const tipoServicio = parseInt(document.getElementById('tipoServicio').value);
        const kWhConsumidos = parseFloat(document.getElementById('kWhConsumidos').value);
        
        // Validaciones
        if (!validarNumeroCuenta(numeroCuenta)) return;
        if (!validarEstrato(estrato)) return;
        if (!validarTipoServicio(tipoServicio)) return;
        if (!validarConsumo(kWhConsumidos)) return;
        
        // Realizar cálculos
        const valorPorConsumo = calcularValorPorConsumo(kWhConsumidos);
        const cargoFijo = calcularCargoFijo(estrato);
        const totalAntesDescuento = valorPorConsumo + cargoFijo;
        const descuento = calcularDescuento(totalAntesDescuento, tipoServicio);
        const totalAPagar = totalAntesDescuento - descuento;
        
        // Mostrar resultados
        mostrarResultados(
            numeroCuenta,
            estrato,
            tipoServicio,
            kWhConsumidos,
            valorPorConsumo,
            cargoFijo,
            descuento,
            totalAPagar
        );
    });
});

// Funciones de validación
function validarNumeroCuenta(numeroCuenta) {
    if (!/^\d{6}$/.test(numeroCuenta)) {
        alert('El número de cuenta debe tener exactamente 6 dígitos');
        return false;
    }
    return true;
}

function validarEstrato(estrato) {
    if (isNaN(estrato) || estrato < 1 || estrato > 6) {
        alert('Seleccione un estrato válido (1-6)');
        return false;
    }
    return true;
}

function validarTipoServicio(tipoServicio) {
    if (isNaN(tipoServicio) || tipoServicio < 1 || tipoServicio > 3) {
        alert('Seleccione un tipo de servicio válido');
        return false;
    }
    return true;
}

function validarConsumo(kWhConsumidos) {
    if (isNaN(kWhConsumidos) || kWhConsumidos < 0) {
        alert('Ingrese una cantidad válida de kWh consumidos');
        return false;
    }
    return true;
}

// Funciones de cálculo
function calcularValorPorConsumo(kWhConsumidos) {
    if (kWhConsumidos <= 150) {
        return kWhConsumidos * 320.45;
    } else if (kWhConsumidos <= 250) {
        return kWhConsumidos * 450.75;
    } else if (kWhConsumidos <= 350) {
        return kWhConsumidos * 501.65;
    } else {
        return kWhConsumidos * 600.50;
    }
}

function calcularCargoFijo(estrato) {
    const cargosFijos = {
        1: 13550,
        2: 14280,
        3: 15485,
        4: 17090,
        5: 19895,
        6: 22530
    };
    return cargosFijos[estrato];
}

function calcularDescuento(totalAntesDescuento, tipoServicio) {
    const porcentajesDescuento = {
        1: 0.30, // Residencial
        2: 0.27, // Comercial
        3: 0.18  // Industrial
    };
    return totalAntesDescuento * porcentajesDescuento[tipoServicio];
}

// Función para mostrar resultados
function mostrarResultados(
    numeroCuenta, 
    estrato, 
    tipoServicio, 
    kWhConsumidos, 
    valorPorConsumo, 
    cargoFijo, 
    descuento, 
    totalAPagar
) {
    document.getElementById('resNumeroCuenta').textContent = numeroCuenta;
    document.getElementById('resEstrato').textContent = `Estrato ${estrato}`;
    document.getElementById('resTipoServicio').textContent = 
        tipoServicio === 1 ? 'Residencial' : tipoServicio === 2 ? 'Comercial' : 'Industrial';
    document.getElementById('resConsumo').textContent = `${kWhConsumidos.toFixed(2)} kWh`;
    document.getElementById('resValorConsumo').textContent = `$${valorPorConsumo.toFixed(2)}`;
    document.getElementById('resCargoFijo').textContent = `$${cargoFijo.toFixed(2)}`;
    document.getElementById('resSubsidio').textContent = `-$${descuento.toFixed(2)}`;
    document.getElementById('resTotalPagar').textContent = `$${totalAPagar.toFixed(2)}`;
    
    // Mostrar sección de resultados
    document.getElementById('resultados').style.display = 'block';
}