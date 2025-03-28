// --- Variables del Juego ---
let secretNumber;
let attempts;
let MAX_NUMBER = 50;
const MIN_NUMBER = 1;
const ATTEMPTS_LIMIT = 10;
let highestScore = localStorage.highest_score
if (highestScore == undefined) {
    highestScore = ATTEMPTS_LIMIT + 1
}

// --- Elementos del DOM ---
const guessesList = document.getElementById('guessesList');
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const message = document.getElementById('message');
const attemptsInfo = document.getElementById('attempts');
const hScoreInfo = document.getElementById('hScore');
const playAgainButton = document.getElementById('playAgainButton');
const selectElement = document.getElementById("dif-select");
const rangeText = document.getElementById("rangeText");

// --- Funciones ---

// Función para iniciar o reiniciar el juego
function startGame() {
    guessesList.innerHTML = ''; // Vacía la lista de intentos anteriores
    // Determines MAX_NUMBER
    selectElement.addEventListener("change", (event) => {
        if (event.target.value == "easy") {
            MAX_NUMBER = 50
        } else if (event.target.value == "normal") {
            MAX_NUMBER = 100
        } else if (event.target.value == "hard") {
            MAX_NUMBER = 200
        } 
        rangeText.textContent = `He pensado en un número entre 1 y ${MAX_NUMBER}. ¿Puedes adivinar cuál es?`;
    });    
    // Genera un número secreto entre MIN_NUMBER y MAX_NUMBER
    secretNumber = Math.floor(Math.random() * MAX_NUMBER) + MIN_NUMBER;
    attempts = 0; // Reinicia los intentos

    // Mensajes iniciales y estado de la UI
    message.textContent = '';
    message.className = 'message'; // Quita clases de color
    attemptsInfo.textContent = '';
    if (highestScore <= ATTEMPTS_LIMIT) {
        hScoreInfo.textContent = `Mejor puntuación: ${highestScore}`;
    } else {
        hScoreInfo.textContent = '';
    }
    
    guessInput.value = ''; // Limpia el input
    guessInput.disabled = false; // Habilita el input
    guessButton.disabled = false; // Habilita el botón de adivinar
    playAgainButton.style.display = 'none'; // Oculta el botón de jugar de nuevo
    guessInput.focus(); // Pone el foco en el input

    console.log(`Pssst... el número secreto es ${secretNumber}`); // Ayuda para depurar
}

// Función para manejar el intento del usuario
function handleGuess() {
    const userGuessText = guessInput.value;

    // Validar si la entrada está vacía
    if (userGuessText === '') {
        setMessage('Por favor, introduce un número.', 'info');
        return;
    }

    const userGuess = parseInt(userGuessText);

    // Validar si la entrada es un número válido y está en el rango
    if (isNaN(userGuess) || userGuess < MIN_NUMBER || userGuess > MAX_NUMBER) {
        setMessage(`Introduce un número válido entre ${MIN_NUMBER} y ${MAX_NUMBER}.`, 'info');
        guessInput.value = ''; // Limpiar el input inválido
        guessInput.focus();
        return;
    }

    // Incrementar el contador de intentos
    attempts++;
    attemptsInfo.textContent = `Intentos: ${attempts}/${ATTEMPTS_LIMIT}`;

    const listItem = document.createElement('li'); // Crea un elemento <li>
    listItem.textContent = userGuess; // Pone el número dentro del <li>
    guessesList.appendChild(listItem); // Añade el <li> a la lista <ul>

    // Comparar el intento con el número secreto
    if (userGuess === secretNumber) {        
        if (attempts < highestScore) {
            highestScore = attempts
            localStorage.highest_score = `${highestScore}`
            hScoreInfo.textContent = `¡Nueva mejor puntuación: ${highestScore}!`;
        }
        setMessage(`¡Correcto! 🎉 El número era ${secretNumber}. Lo adivinaste en ${attempts} intentos.`, 'correct');

        endGame();
    } else if (userGuess < secretNumber) {
        setMessage(`¡Demasiado bajo! Intenta un número más alto. 👇`, 'wrong');
    } else {
        setMessage(`¡Demasiado alto! Intenta un número más bajo. 👆`, 'wrong');
    }

    // Limpiar el input para el siguiente intento (si no ha ganado)
    if (userGuess !== secretNumber) {
        guessInput.value = '';
        guessInput.focus();
    }

    if (attempts > ATTEMPTS_LIMIT) {
        setMessage(`¡Has perdido! 🎉 El número era ${secretNumber}. Intentos: ${attempts}/${ATTEMPTS_LIMIT}.`, 'wrong');
        endGame();
    }
}

// Función para mostrar mensajes al usuario
function setMessage(msg, type) {
    message.textContent = msg;
    message.className = `message ${type}`; // Añade clase para el color (correct, wrong, info)
}

// Función para terminar el juego (cuando se adivina el número)
function endGame() {
    guessInput.disabled = true; // Deshabilita el input
    guessButton.disabled = true; // Deshabilita el botón de adivinar
    playAgainButton.style.display = 'inline-block'; // Muestra el botón de jugar de nuevo
}

// --- Event Listeners ---

// Escuchar clics en el botón "Adivinar"
guessButton.addEventListener('click', handleGuess);

// Escuchar la tecla "Enter" en el campo de entrada
guessInput.addEventListener('keyup', function(event) {
    // Si la tecla presionada es Enter (código 13)
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita comportamiento por defecto (si estuviera en un form)
        handleGuess(); // Llama a la función de adivinar
    }
});

// Escuchar clics en el botón "Jugar de Nuevo"
playAgainButton.addEventListener('click', startGame);

// --- Iniciar el juego al cargar la página ---
startGame();