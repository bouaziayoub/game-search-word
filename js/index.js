const btn = document.getElementById("btn");
const word = document.getElementById("current-word");
const message = document.querySelector(".message");
let letra = document.getElementById("letra");

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

// ! Función para evaluar la letra introducida
function evaluateLetter(letra) {
  let letraValue = letra.value;
  console.log(letraValue);
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
    message.innerHTML = contadorErrores;
    if (contadorErrores >= 6) {
      message.style.display = "block";
      message.style.color = "red";
      message.innerHTML = `Has perdido!! <span style="color: black"> la palabra era:  ${secretWord}`;
    }
  }

  // ! Comprobamos si se ha completado la palabra
  if (currentWord.indexOf("_") === -1) {
    message.style.display = "block";
    message.style.color = "green";
    message.innerHTML = "Has ganado";
  }
  letraValue = "";
}

// ! Evento para el botón
btn.addEventListener("click", (e) => {
  e.preventDefault();
  evaluateLetter(letra);
});
