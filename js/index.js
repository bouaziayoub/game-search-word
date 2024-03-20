// busca la palabra

const btn = document.getElementById("btn");
const word = document.getElementById("current-word");
const message = document.querySelector(".message");
const emoji = document.querySelector(".emoji");
let letra = document.getElementById("letra");

// ? 1.- Implementar que el usuario introduzca su nombre.
// input nombre
const nombre = document.querySelector(".input-nombre");
// botón entrar
const btnEntrar = document.querySelector(".btn-entrar");
// juego
const juego = document.querySelector(".juego");
// datos usuario
const datosUsuario = document.querySelector(".datosUsuario");
// tiempo
const tiempo = document.querySelector(".tiempo");
// countTime
const countTime = document.getElementById("countTime");

// elegir opción (btn iniciar partida o btn introducir palabra)
const elegirOpcion = document.querySelector(".elegir-opcion");
const btnIniciarPartida = document.querySelector(".btn-iniciar");
const anadirPlabraContenidor = document.querySelector(
  ".anadir-palabra-contenidor"
);
// button add word
const btnAdd = document.querySelector(".btn-add");
const nuevaPalabra = document.querySelector(".input-palabra");
// button guess new word
const btnGuessWord = document.querySelector(".btnGuessWord");

// ! evento para el botón de iniciar partida
btnEntrar.addEventListener("click", (e) => {
  e.preventDefault();

  if (nombre.value.length < 2) {
    message.style.display = "block";
    message.innerHTML = "Introduce un nombre válido mas de 2 caracteres 🤔";
  } else {
    message.innerHTML = "";
    message.style.display = "none";
    elegirOpcion.style.display = "block";
    datosUsuario.style.display = "none";
  }
});

// ! evento para el botón de iniciar partida
btnIniciarPartida.addEventListener("click", (e) => {
  e.preventDefault();
  setInterval(chronometer, 1000);

  elegirOpcion.style.display = "none";
  // Call displayGameAndTime
  displayGameAndTime();
});

// ! evento para el botón de adivinar palabra
btnGuessWord.addEventListener("click", () => {
  anadirPlabraContenidor.style.display = "block";
  elegirOpcion.style.display = "none";
});

// ! evento para el botón de añadir palabra
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

  // }
});

// ! juego de ahorcado
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

word.innerHTML = currentWord;

// ! Función para reemplazar un caracter en una cadena
function replaceAt(string, index, replace) {
  if (index >= string.length) {
    return string.valueOf();
  }
  return string.substring(0, index) + replace + string.substring(index + 1);
}

// ! Función para mostrar el juego y el tiempo
function displayGameAndTime() {
  message.style.display = "none";
  anadirPlabraContenidor.style.display = "none";
  juego.style.display = "block";
  tiempo.style.display = "block";
}
// ! Función para evaluar la letra introducida
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
      message.style.display = "block";

      cleanEmojiTime();
      message.innerHTML = `OOOH 😱 ${nombre.value}, Has perdido!! <span style="color: black"> la palabra era:  ${secretWord}`;
    }
  }

  // ! Función para limpiar emoji y tiempo
  function cleanEmojiTime() {
    tiempo.style.display = "none";
    emoji.style.display = "none";
  }
  // ! Comprobamos si se ha completado la palabra y mostrar el tiempo que ha tardado
  if (currentWord.indexOf("_") === -1) {
    message.style.display = "block";
    message.style.color = "green";
    message.style.border = "2px solid green";
    message.style.backgroundColor = "lightgreen";
    message.innerHTML = `Felicidades 🎈🎉🎈 ${nombre.value}, Has ganado. La duración fue de ${hours}:${minutes}:${seconds}`; // felicidades

    // Call cleanEmojiTime function
    cleanEmojiTime();
  }

  letraValue = "";
}

// ! Evento para el botón
btn.addEventListener("click", (e) => {
  e.preventDefault();
  evaluateLetter(letra);
});

let hours = `00`,
  minutes = `00`,
  seconds = `00`;

// ! Función para el cronómetro
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

// stop chronometer
function stopChronometer() {
  clearInterval(chronometer);
}

// setInterval(chronometer, 1000);
// tiempo();
