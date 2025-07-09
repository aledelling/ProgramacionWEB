class Persona {
    nombre = "Homero";
    apellido = "Simpson";
    direccion = "Calle 123";
    telefono = "1234567890";
    mail = "homero.simpson@gmail.com";

    trabajar() {
        return "Trabajando en la planta nuclear de Springfield";
    }

    estudiar() {
        return "Estudiando en la escuela de Springfield";
    }
}

const homero = new Persona();
const bart = new Persona();
document.write(homero.nombre + " " + homero.apellido + "<br>")  ;
document.write(homero.trabajar() + "<br>");
document.write(homero.estudiar() + "<br>");
document.write("<br>");
document.write("<br>");
document.write('Bart', bart.apellido + "<br>");
document.write('Estudia en: ' + bart.estudiar() + "<br>");
