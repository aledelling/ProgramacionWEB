let semana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
let num;
do {
    num = prompt('Ingrese un numero del 1 al 7');
} while (num < 1 || num > 7);

document.write(`El dia de la semana es: ${semana[num - 1]}`);

function validarNumero(entrada) {
    try {
      const numero = Number(entrada); // Intenta convertir la entrada a un número
      if (isNaN(numero)) { // Si el resultado es NaN, la conversión falló
        throw new Error("Entrada inválida. Por favor, ingresa un número.");
      }
      return numero; // Si la conversión fue exitosa, devuelve el número
    } catch (error) {
      console.error(error.message); // Maneja el error (muestra el mensaje)
      return null; // O devuelve un valor predeterminado, o relanza el error, etc.
    }
  }
  
  // Ejemplo de uso:
  let entradaUsuario = prompt("Ingresa un número:");
  let numeroValidado = validarNumero(entradaUsuario);
  
  if (numeroValidado !== null) {
    console.log("Número ingresado:", numeroValidado);
    // Realiza operaciones con el número validado
  } else {
    console.log("No se pudo obtener un número válido.");
  }

      // --- EJERCICIO 4: DÍA DE LA SEMANA ---
      const formDiaSemana = document.getElementById('form-dia-semana');
      const resultadoDiaSemana = document.getElementById('resultado-dia-semana');
      if (formDiaSemana) {
          formDiaSemana.addEventListener('submit', function(e) {
              e.preventDefault();
              const entrada = document.getElementById('numero-dia').value;
              let numero = Number(entrada);
              if (isNaN(numero) || numero < 1 || numero > 7) {
                  resultadoDiaSemana.textContent = 'Por favor, ingresa un número válido entre 1 y 7.';
                  return;
              }
              const semana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
              resultadoDiaSemana.textContent = `El día de la semana es: ${semana[numero - 1]}`;
          });
      }
