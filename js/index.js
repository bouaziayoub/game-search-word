// Version: 1.0
// Date: 2024.03.19
// Description: Buscar palabra
// Author: Ayoub Bouazi

// Variables para el juego

// ----------------------------- ELEMENTOS DEL DOM ----------------------------
// botón comprobar letra
const btnComprobarLetra = document.getElementById("btn");
// palabra actual
const word = document.getElementById("current-word");
// mensaje
const message = document.querySelector(".message");
// emoji
const emoji = document.querySelector(".emoji");
// input letra
let letra = document.getElementById("letra");

// datos usuario
const datosUsuario = document.querySelector(".datosUsuario");
// input nombre del usuario
const nombre = document.querySelector(".input-nombre");
// botón entrar a jugar
const btnEntrarJugar = document.querySelector(".btn-entrar");
// juego
const juego = document.querySelector(".juego");

// tiempo
const tiempo = document.querySelector(".tiempo");
// countTime
const countTime = document.getElementById("countTime");

// button back
const btnVolverAtras = document.querySelector(".btnVolverAtras");

// elegir opción (btn iniciar partida o btn introducir palabra)
const elegirOpcion = document.querySelector(".elegir-opcion");
const btnIniciarPartida = document.querySelector(".btn-iniciar");
const anadirPlabraContenidor = document.querySelector(
  ".anadir-palabra-contenidor"
);
// button add word
const btnAdd = document.querySelector(".btn-add");
// input nueva palabra
const nuevaPalabra = document.querySelector(".input-palabra");
// button guess new word
const btnGuessWord = document.querySelector(".btnGuessWord");
// contador de errores
let contadorErrores = 0;
// array de palabras secretas
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

// Variables de la funccion cronómetro --------------------------------
let hours = `00`,
  minutes = `00`,
  seconds = `00`;

// Variables para el juego ------------------------------------------------
// Variable para la palabra secreta
let secretWord = secretWords[Math.floor(Math.random() * secretWords.length)];

// Variable para la palabra actual
let currentWord = secretWord.replace(/./g, "_ ");

// Mostramos la palabra actual ----------------
word.innerHTML = currentWord;
// ----------------------------- EVENTOS --------------------------------

// evento para el botón de iniciar partida
btnEntrarJugar.addEventListener("click", (e) => {
  e.preventDefault();

  if (nombre.value.length < 2) {
    message.style.display = "block"; // mostrar mensaje
    message.innerHTML = "Introduce un nombre válido mas de 2 caracteres 🤔";
  } else {
    message.style.display = "none"; // ocultar mensaje
    elegirOpcion.style.display = "block"; // mostrar botones elegir opción (btn iniciar partida o btn introducir palabra)
    datosUsuario.style.display = "none"; // ocultar datos usuario
  }
});

// evento para el botón de iniciar partida
btnIniciarPartida.addEventListener("click", (e) => {
  e.preventDefault();
  setInterval(chronometer, 1000);
  elegirOpcion.style.display = "none"; // ocultar botones elegir opción (btn iniciar partida o btn introducir palabra)
  // Call displayGameAndTime
  displayGameAndTime();
});

// evento para el botón de adivinar palabra
btnGuessWord.addEventListener("click", () => {
  anadirPlabraContenidor.style.display = "block"; // mostrar input añadir palabra
  elegirOpcion.style.display = "none"; // ocultar botones
});

// evento para el botón de añadir palabra y empezar a jugar
btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
  if (nuevaPalabra.value.length < 2) {
    message.style.display = "block";
    message.innerHTML = "Introduce una palabra válida mas de 2 caracteres 🤔";
  } else {
    setInterval(chronometer, 1000);

    secretWord = nuevaPalabra.value;
    currentWord = secretWord.replace(/./g, "_ ");
    word.innerHTML = currentWord;
    elegirOpcion.style.display = "none";

    // Call displayGameAndTime
    displayGameAndTime();
  }
});

// Evento para el botón de comprobar letra
btnComprobarLetra.addEventListener("click", (e) => {
  e.preventDefault();
  evaluateLetter(letra);
});

// Evento para el botón de volver atrás
btnVolverAtras.addEventListener("click", () => {
  message.style.display = "none"; // ocultar mensaje
  if (
    anadirPlabraContenidor.style.display === "block" ||
    juego.style.display === "block"
  ) {
    anadirPlabraContenidor.style.display = "none"; // ocultar input añadir palabra
    juego.style.display = "none"; // ocultar juego
    elegirOpcion.style.display = "block"; // mostrar botones elegir opción (btn iniciar partida o btn introducir palabra)
  } else {
    datosUsuario.style.display = "flex"; // mostrar botones elegir opción (btn iniciar partida o btn introducir palabra)
    elegirOpcion.style.display = "none"; // ocultar botones elegir opción (btn iniciar partida o btn introducir palabra)
    btnVolverAtras.style.display = "none"; // ocultar botón volver atrás
  }
});

// ----------------------------- FUNCTIONS --------------------------------

// Función para el cronómetro
function chronometer() {
  seconds++;

  if (seconds < 10) seconds = `0` + seconds;

  if (seconds > 59) {
    seconds = `00`;
    minutes++;

    if (minutes < 10) minutes = `0` + minutes;
  }

  if (minutes > 59) {
    minutes = `00`;
    hours++;

    if (hours < 10) hours = `0` + hours;
  }
  // document.getElementById("tiempo").textContent

  countTime.textContent = `${hours}:${minutes}:${seconds}`;
}

// Función para reemplazar un caracter en una cadena
function replaceAt(string, index, replace) {
  if (index >= string.length) {
    return string.valueOf();
  }
  return string.substring(0, index) + replace + string.substring(index + 1);
}

// Función para mostrar el juego y el tiempo y ocultar el mensaje y el input de añadir palabra
function displayGameAndTime() {
  message.style.display = "none";
  anadirPlabraContenidor.style.display = "none"; // ocultar input añadir palabra
  juego.style.display = "block"; // mostrar juego
  tiempo.style.display = "block"; // mostrar tiempo
}

// Función para ocultar emoji y tiempo y mostrar el botón de volver atrás
function cleanEmojiTime() {
  tiempo.style.display = "none";
  emoji.style.display = "none";
  btnVolverAtras.style.display = "block"; // mostrar botón volver atrás
}

// Función para evaluar la letra introducida
function evaluateLetter(letra) {
  let letraValue = letra.value;
  let posicionCoincidencia = secretWord.indexOf(letraValue);
  if (posicionCoincidencia >= 0) {
    for (i = 0; i < secretWord.length; i++) {
      if (secretWord[i] === letraValue) {
        currentWord = replaceAt(currentWord, i * 2, letraValue);
      }
    }
    word.innerHTML = currentWord;
    letraValue = "";
  } else {
    contadorErrores++;
    emoji.innerHTML = contadorErrores;
    if (contadorErrores === 1) {
      emoji.innerHTML = " 🤨 ";
    } else if (contadorErrores === 2) {
      emoji.innerHTML = " 😐";
    } else if (contadorErrores === 3) {
      emoji.innerHTML = " 😕";
    } else if (contadorErrores === 4) {
      emoji.innerHTML = " 😟";
    } else if (contadorErrores === 5) {
      emoji.innerHTML = " 😧";
    } else if (contadorErrores >= 6) {
      message.style.display = "block"; // mostrar mensaje

      cleanEmojiTime();
      message.innerHTML = `OOOH 😱 ${nombre.value}, Has perdido!! <span style="color: black"> la palabra era:  ${secretWord}`;
    }
  }
  // ! Comprobamos si se ha completado la palabra y mostrar el tiempo que ha tardado
  if (currentWord.indexOf("_") === -1) {
    message.style.display = "block"; // mostrar mensaje
    message.style.color = "green";
    message.style.border = "2px solid green";
    message.style.backgroundColor = "lightgreen";
    message.innerHTML = `Felicidades 🎈🎉🎈 ${nombre.value}, Has ganado. La duración fue de ${hours}:${minutes}:${seconds}`; // felicidades

    // Call cleanEmojiTime function
    cleanEmojiTime();
  }

  letraValue = "";
}
