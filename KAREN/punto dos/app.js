let totalPersonas = 0;
let actual = 0;
let siVotan = 0;
let noVotan = 0;
let votos = [0, 0, 0]; // índice 0: partido 1, 1: partido 2, 2: partido 3

function iniciarEncuesta() {
  totalPersonas = parseInt(document.getElementById("numPersonas").value);
  if (!totalPersonas || totalPersonas < 1) {
    alert("Ingrese un número válido de personas.");
    return;
  }

  actual = 0;
  siVotan = 0;
  noVotan = 0;
  votos = [0, 0, 0];

  document.getElementById("formulario").style.display = "block";
  document.getElementById("resultados").style.display = "none";
  document.getElementById("respuesta").value = "";
  document.getElementById("partidoBox").style.display = "none";
  alert("Encuesta iniciada. Persona 1:");
}

document.getElementById("respuesta").addEventListener("change", function () {
  if (this.value === "si") {
    document.getElementById("partidoBox").style.display = "block";
  } else {
    document.getElementById("partidoBox").style.display = "none";
    document.getElementById("partido").value = "";
  }
});

function registrarRespuesta() {
  let respuesta = document.getElementById("respuesta").value;
  let partido = document.getElementById("partido").value;

  if (respuesta === "") {
    alert("Por favor seleccione si va a votar.");
    return;
  }

  if (respuesta === "si") {
    if (!["1", "2", "3"].includes(partido)) {
      alert("Seleccione un partido válido.");
      return;
    }
    siVotan++;
    votos[parseInt(partido) - 1]++;
  } else {
    noVotan++;
  }

  actual++;

  if (actual < totalPersonas) {
    document.getElementById("respuesta").value = "";
    document.getElementById("partido").value = "";
    document.getElementById("partidoBox").style.display = "none";
    alert(`Siguiente persona (${actual + 1}):`);
  } else {
    mostrarResultados();
  }
}

function mostrarResultados() {
  let resultadosDiv = document.getElementById("resultados");
  resultadosDiv.style.display = "block";

  let abstencion = ((noVotan / totalPersonas) * 100).toFixed(2);
  let porcentajeSiVotan = ((siVotan / totalPersonas) * 100).toFixed(2);
  let porcentajes = votos.map(v => ((v / siVotan) * 100).toFixed(2));

  let maxVotos = Math.max(...votos);
  let partidoGanador = votos.indexOf(maxVotos) + 1;

  resultadosDiv.innerHTML = `
    <strong>RESULTADOS:</strong><br><br>
    Partido en primer lugar: <strong>Partido ${partidoGanador}</strong><br>
    Porcentaje de abstención: <strong>${abstencion}%</strong><br>
    Porcentaje de personas que SÍ votarán: <strong>${porcentajeSiVotan}%</strong><br><br>
    <strong>Porcentaje por partido (entre votantes):</strong><br>
    Partido 1: ${porcentajes[0]}%<br>
    Partido 2: ${porcentajes[1]}%<br>
    Partido 3: ${porcentajes[2]}%
  `;
}
