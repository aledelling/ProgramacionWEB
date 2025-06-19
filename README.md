# ProgramacionWEB
JavaScript - Caracteristicas
Es un lenguaje de programación del lado del cliente.
Es interpretado no compilado.
Es imperativo y estructurado.

JavaScript es un lenguaje intepretado por el navegador, para insertar código puede hacerse de dos maneras: escribirlo directamente o referenciarlo a través del nombre de un archivo externo con extension .js

# Variables VAR - LET y CONST

1. Declarar siempre las variables
2. Utilice siempre const, si el valor no se debe cambiar.
3. Use siempre const, si el tipo no se debe cambiar(Arrays y Objetos)
4. Utilice solo let, si no puede usar const.
5. Use solo var Si DEBE admintir navegadores.

# Tipos de Datos

Númerico: enteros, decimales y de coma flotante.
String: Secuencia de caracteres, tambíen llamado texto
Boolean; datos lógicos, true o false
Undefined: Tipos de datos no definidos
Null: Datos que no existen, llamados datos nulos

# 📌 Operadores en JavaScript

JavaScript incluye diversos operadores que permiten realizar operaciones con variables y valores. A

## 🧮 1. Operadores Aritméticos

| Operador | Descripción                        | Ejemplo         |
|----------|------------------------------------|-----------------|
| `+`      | Suma                               | `a + b`         |
| `-`      | Resta                              | `a - b`         |
| `*`      | Multiplicación                     | `a * b`         |
| `/`      | División                           | `a / b`         |
| `%`      | Módulo (resto)                     | `a % b`         |
| `**`     | Exponente                          | `a ** b`        |
| `++`     | Incremento (suma 1)                | `a++`           |
| `--`     | Decremento (resta 1)               | `a--`           |

---

## 📝 2. Operadores de Asignación

| Operador | Descripción                          | Ejemplo         |
|----------|--------------------------------------|-----------------|
| `=`      | Asignación simple                    | `x = 10`        |
| `+=`     | Suma y asigna                        | `x += 5`        |
| `-=`     | Resta y asigna                       | `x -= 3`        |
| `*=`     | Multiplica y asigna                  | `x *= 2`        |
| `/=`     | Divide y asigna                      | `x /= 4`        |
| `%=`     | Módulo y asigna                      | `x %= 2`        |
| `**=`    | Potencia y asigna                    | `x **= 3`       |

---

## 🔍 3. Operadores de Comparación

| Operador | Descripción                                | Ejemplo           |
|----------|--------------------------------------------|-------------------|
| `==`     | Igual (sin tipo)                           | `5 == '5'`        |
| `===`    | Estrictamente igual (valor y tipo)         | `5 === 5`         |
| `!=`     | No igual (sin tipo)                        | `5 != '6'`        |
| `!==`    | No igual estricto                          | `5 !== '5'`       |
| `>`      | Mayor que                                  | `x > y`           |
| `<`      | Menor que                                  | `x < y`           |
| `>=`     | Mayor o igual                              | `x >= y`          |
| `<=`     | Menor o igual                              | `x <= y`          |

---

## 🔗 4. Operadores Lógicos

| Operador | Descripción                    | Ejemplo             |
|----------|--------------------------------|---------------------|
| `&&`     | AND lógico                     | `cond1 && cond2`    |
| `||`     | OR lógico                      | `cond1 || cond2`    |
| `!`      | NOT lógico                     | `!condición`        |

---

## 🧠 5. Operadores de Bits

| Operador | Descripción                    | Ejemplo             |
|----------|--------------------------------|---------------------|
| `&`      | AND bit a bit                  | `a & b`             |
| `|`      | OR bit a bit                   | `a | b`             |
| `^`      | XOR bit a bit                  | `a ^ b`             |
| `~`      | NOT bit a bit (complemento)    | `~a`                |
| `<<`     | Desplazamiento a la izquierda  | `a << 2`            |
| `>>`     | Desplazamiento a la derecha    | `a >> 2`            |
| `>>>`    | Desplazamiento sin signo       | `a >>> 2`           |

---

## ❓ 6. Operador Ternario

| Sintaxis                  | Descripción                                           | Ejemplo                           |
|--------------------------|-------------------------------------------------------|-----------------------------------|
| `cond ? val1 : val2`     | Devuelve `val1` si la condición es verdadera, si no `val2` | `edad >= 18 ? 'Adulto' : 'Menor'` |

---

## 🔍 7. Operadores de Tipo

| Operador     | Descripción                                       | Ejemplo                 |
|--------------|---------------------------------------------------|-------------------------|
| `typeof`     | Devuelve el tipo de una variable o expresión      | `typeof "hola"`         |
| `instanceof` | Verifica si un objeto es instancia de una clase   | `obj instanceof Array`  |

---

## ❔ 8. Encadenamiento Opcional

| Operador | Descripción                                                         | Ejemplo                  |
|----------|---------------------------------------------------------------------|--------------------------|
| `?.`     | Evita error si el valor anterior es `null` o `undefined`            | `usuario?.perfil?.edad` |

---

## ⚙️ 9. Nullish Coalescing

| Operador | Descripción                                                        | Ejemplo                     |
|----------|--------------------------------------------------------------------|-----------------------------|
| `??`     | Devuelve el valor de la derecha si el de la izquierda es `null` o `undefined` | `entrada ?? "por defecto"` |

---

> 📚 Este resumen te servirá como referencia rápida para entender y usar los operadores más importantes de JavaScript.
