// --- EJERCICIO 2: NOTAS ---

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-notas');
    const listaNotasDiv = document.getElementById('lista-notas');
    const resultadosDiv = document.getElementById('resultados');
    const contadorAlumnos = document.getElementById('contador-alumnos');

    let alumnos = [];
    let maxAlumnos = 5;

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (alumnos.length >= maxAlumnos) return;

        const matematicas = parseFloat(document.getElementById('matematicas').value);
        const estadistica = parseFloat(document.getElementById('estadistica').value);
        const informatica = parseFloat(document.getElementById('informatica').value);

        alumnos.push({ matematicas, estadistica, informatica });
        mostrarNotas();
        form.reset();
        actualizarContador();
        mostrarResultados();

        if (alumnos.length === maxAlumnos) {
            form.querySelector('button[type="submit"]').disabled = true;
            contadorAlumnos.textContent = '¡Registro completo!';
        }
    });

    function mostrarNotas() {
        let html = '<h3>Notas ingresadas:</h3><ul>';
        for (let i = 0; i < alumnos.length; i++) {
            const a = alumnos[i];
            html += `<li>Alumno ${i+1}: Matemáticas: ${a.matematicas}, Estadística: ${a.estadistica}, Informática: ${a.informatica}</li>`;
        }
        html += '</ul>';
        listaNotasDiv.innerHTML = html;
    }

    function actualizarContador() {
        if (alumnos.length < maxAlumnos) {
            contadorAlumnos.textContent = `Alumno ${alumnos.length + 1} de ${maxAlumnos}`;
        } else {
            contadorAlumnos.textContent = '¡Registro completo!';
        }
    }

    function mostrarResultados() {
        if (alumnos.length === 0) {
            resultadosDiv.innerHTML = '';
            return;
        }
        // Promedio de Informática
        let sumaInfo = 0;
        let aprobadosMat = 0;
        let mayorEstad = alumnos[0].estadistica;
        let menorInfo = alumnos[0].informatica;
        for (let i = 0; i < alumnos.length; i++) {
            const a = alumnos[i];
            sumaInfo += a.informatica;
            if (a.matematicas >= 3.0) aprobadosMat++;
            if (a.estadistica > mayorEstad) mayorEstad = a.estadistica;
            if (a.informatica < menorInfo) menorInfo = a.informatica;
        }
        let promedioInfo = (sumaInfo / alumnos.length).toFixed(2);
        resultadosDiv.innerHTML = `
            <h3>Resultados:</h3>
            <ul>
                <li><strong>Promedio de nota Informática:</strong> ${promedioInfo}</li>
                <li><strong>Cantidad de aprobados en Matemáticas:</strong> ${aprobadosMat}</li>
                <li><strong>Nota mayor de Estadística:</strong> ${mayorEstad}</li>
                <li><strong>Nota más baja de Informática:</strong> ${menorInfo}</li>
            </ul>
        `;
    }

    actualizarContador();
    mostrarResultados();
});
