const btn = document.getElementById("btn");


let contadorErrores = 0;
let secretWords = [
  "hola",
  "adios",
  "casa",
  "perro",
  "gato",
  "raton",
  "pajaro",
  "pescado",
  "tortuga",
  "leon",
  "tigre",
  "elefante",
  "jirafa",
  "cebra",
  "mono",
  "gorila",
  "orangutan",
  "chimpancé",
  "hormiga",
  "mosquito",
  "araña",
  "escarabajo",
  "mariposa",
  "abeja",
  "avispa",
  "mosca",
  "libélula",
  "saltamontes",
  "grillo",
  "cigarra",
  "chinche",
  "motocicleta",
  "bicicleta",
  "coche",
  "camión",
  "furgoneta",
  "autobús",
  "tren",
  "metro",
  "tranvía",
];

let secretWord = secretWords[Math.floor(Math.random() * secretWords.length)];

let currentWord = secretWord.replace(/./g, "_ ");

document.getElementById("current-word").innerHTML = currentWord;

// ! Función para reemplazar un caracter en una cadena
function replaceAt(string, index, replace) {
  if (index >= string.length) {
    return string.valueOf();
  }
  return string.substring(0, index) + replace + string.substring(index + 1);
}

// ! Función para evaluar la letra introducida
function evaluateLetter() {
  let letra = document.getElementById("letra").value;
  let posicionCoincidencia = secretWord.indexOf(letra);
  if (posicionCoincidencia >= 0) {
    for (i = 0; i < secretWord.length; i++) {
      if (secretWord[i] === letra) {
        // currentWord =
        //   currentWord.substring(0, i * 2) +
        //   letra +
        //   currentWord.substring(i * 2 + 1);
        currentWord = replaceAt(currentWord, i * 2, letra);
      }
    }
    document.getElementById("current-word").innerHTML = currentWord;
    document.getElementById("letra").value = "";
  } else {
    contadorErrores++;
    document.querySelector(".message").innerHTML = contadorErrores;
    if (contadorErrores === 6) {
      document.querySelector(".message").style.display = "block";
      document.querySelector(".message").style.color = "red";
      document.querySelector(".message").innerHTML = "Has perdido";
    }
  }

  // ! Comprobamos si se ha completado la palabra
  if (currentWord.indexOf("_") === -1) {
    document.querySelector(".message").style.display = "block";
    document.querySelector(".message").style.color = "green";
    document.querySelector(".message").innerHTML = "Has ganado";
  }
  document.getElementById("letra").value = "";
}

// ! Evento para el botón
btn.addEventListener("click", (e) => {
  e.preventDefault();
  evaluateLetter();
});
