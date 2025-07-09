/**
 * Calcula cuánto debe pagar cada persona basándose en el total de la cuenta,
 * el porcentaje de propina y el número de personas.
 * 
 * @param {number} totalCuenta - El total de la cuenta
 * @param {number} porcentajePropina - El porcentaje de propina que se desea dejar
 * @param {number} numeroPersonas - El número de personas entre las que se divide la cuenta
 * @returns {number|string} El monto que debe pagar cada persona o mensaje de error
 */
function calcularPagoPorPersona(totalCuenta, porcentajePropina, numeroPersonas) {
    // Validaciones
    if (typeof totalCuenta !== 'number' || typeof porcentajePropina !== 'number' || typeof numeroPersonas !== 'number') {
        return 'Error: Todos los parámetros deben ser números';
    }
    
    if (totalCuenta <= 0) {
        return 'Error: El total de la cuenta debe ser mayor a 0';
    }
    
    if (porcentajePropina < 0) {
        return 'Error: El porcentaje de propina no puede ser negativo';
    }
    
    if (numeroPersonas <= 0 || !Number.isInteger(numeroPersonas)) {
        return 'Error: El número de personas debe ser un entero mayor a 0';
    }
    
    // Calcular el total de la propina
    const totalPropina = totalCuenta * (porcentajePropina / 100);
    
    // Sumar la propina al total de la cuenta
    const totalConPropina = totalCuenta + totalPropina;
    
    // Dividir el total entre el número de personas
    const pagoPorPersona = totalConPropina / numeroPersonas;
    
    // Devolver el resultado redondeado a 2 decimales
    return Math.round(pagoPorPersona * 100) / 100;
}

