**Ejercicio 1: Visualizar Historial de Intentos**

*   **Enunciado:** Modifica la aplicación para que cada número que el usuario intente adivinar se muestre en una lista en la pantalla. Esto ayuda al jugador a recordar qué números ya ha probado.

*   **Solución Explicada:**

    1.  **HTML:** Necesitamos un lugar donde mostrar la lista de intentos. Añade un elemento `<ul>` (lista desordenada) en tu `index.html`, por ejemplo, debajo del párrafo de intentos (`#attempts`):

        ```html
        <!-- Dentro de <div class="container"> -->
        <p id="attempts" class="attempts-info"></p>

        <!-- NUEVO: Añadir esta sección -->
        <div class="previous-guesses">
            <h4>Intentos anteriores:</h4>
            <ul id="guessesList">
                <!-- Aquí se añadirán los intentos con JS -->
            </ul>
        </div>
        <!-- FIN NUEVO -->

        <button id="playAgainButton" class="play-again" style="display: none;">Jugar de Nuevo</button>
        ```

    2.  **CSS (Opcional):** Puedes añadir algunos estilos básicos en `style.css` para que la lista se vea mejor:

        ```css
        .previous-guesses {
            margin-top: 20px;
            text-align: left; /* Alinea el texto a la izquierda dentro de esta sección */
            max-height: 100px; /* Limita la altura */
            overflow-y: auto; /* Añade scroll si hay muchos intentos */
            border: 1px solid #eee;
            padding: 5px 15px;
            border-radius: 4px;
            background-color: #f9f9f9;
        }

        .previous-guesses h4 {
            margin-bottom: 5px;
            color: #555;
            text-align: center; /* Centra el título si prefieres */
        }

        #guessesList {
            list-style: none; /* Quita los puntos de la lista */
            padding: 0;
            margin: 0;
            display: flex; /* Coloca los números en línea */
            flex-wrap: wrap; /* Permite que pasen a la siguiente línea */
            gap: 8px; /* Espacio entre números */
            justify-content: center; /* Centra los números */
        }

        #guessesList li {
            background-color: #e0e0e0;
            padding: 2px 8px;
            border-radius: 3px;
            font-size: 0.9em;
        }
        ```

    3.  **JavaScript (`script.js`):**
        *   **Obtener referencia al nuevo elemento:** Añade la lista a tus referencias del DOM al principio del script:
            ```javascript
            const guessesList = document.getElementById('guessesList');
            // ... (las otras referencias: guessInput, guessButton, etc.)
            ```
        *   **Limpiar la lista al iniciar/reiniciar:** En la función `startGame()`, asegúrate de que la lista se vacíe cada vez que comience un nuevo juego:
            ```javascript
            function startGame() {
                // ... (código existente de startGame)
                guessesList.innerHTML = ''; // Vacía la lista de intentos anteriores
                // ... (resto del código de startGame)
            }
            ```
        *   **Añadir cada intento a la lista:** En la función `handleGuess()`, después de validar que la entrada es un número correcto y antes de comprobar si es el número secreto, añade el intento a la lista visual.

            ```javascript
            function handleGuess() {
                // ... (código de validación existente)

                const userGuess = parseInt(userGuessText);

                // VALIDACIÓN (ya existente)
                if (isNaN(userGuess) || userGuess < MIN_NUMBER || userGuess > MAX_NUMBER) {
                     setMessage(`Introduce un número válido entre ${MIN_NUMBER} y ${MAX_NUMBER}.`, 'info');
                     guessInput.value = '';
                     guessInput.focus();
                     return; // Importante: Salir si la validación falla
                 }

                // Incrementar intentos (ya existente)
                attempts++;
                attemptsInfo.textContent = `Intentos: ${attempts}`;

                // --- NUEVO: Añadir intento a la lista visual ---
                const listItem = document.createElement('li'); // Crea un elemento <li>
                listItem.textContent = userGuess; // Pone el número dentro del <li>
                guessesList.appendChild(listItem); // Añade el <li> a la lista <ul>
                // --- FIN NUEVO ---

                // Comparar el intento (ya existente)
                if (userGuess === secretNumber) {
                    setMessage(`¡Correcto! 🎉 El número era ${secretNumber}. Lo adivinaste en ${attempts} intentos.`, 'correct');
                    endGame();
                } else if (userGuess < secretNumber) {
                    setMessage('¡Demasiado bajo! Intenta un número más alto. 👇', 'wrong');
                } else {
                    setMessage('¡Demasiado alto! Intenta un número más bajo. 👆', 'wrong');
                }

                // Limpiar input si no ha ganado (ya existente)
                if (userGuess !== secretNumber) {
                    guessInput.value = '';
                    guessInput.focus();
                }
            }
            ```

    *   **Explicación Final:** Cada vez que el usuario introduce un número válido, creamos un nuevo elemento de lista (`<li>`), le asignamos el número introducido como texto y lo añadimos (`appendChild`) a la lista `<ul>` que creamos en el HTML. Al reiniciar el juego, vaciamos el contenido de la `<ul>` (`innerHTML = ''`) para empezar de cero.

---

**Ejercicio 2: Límite de Intentos**

*   **Enunciado:** Añade una regla al juego donde el jugador solo tenga un número limitado de intentos (por ejemplo, 10) para adivinar el número secreto. Si se acaban los intentos, el juego termina, se muestra un mensaje de "¡Has perdido!" y se revela cuál era el número secreto. Actualiza también la información de intentos para mostrar `Intentos: X / 10`.

---

**Ejercicio 3: Niveles de Dificultad**

*   **Enunciado:** Permite al usuario elegir un nivel de dificultad (por ejemplo, Fácil: 1-50, Medio: 1-100, Difícil: 1-200) *antes* de empezar a jugar. Puedes usar botones de radio o un desplegable (`<select>`) en el HTML. La función `startGame` deberá ajustarse para generar el `secretNumber` dentro del rango seleccionado y actualizar el texto descriptivo (`He pensado en un número entre X y Y`).

---


**Ejercicio 4: Guardar Puntuación Más Alta (High Score)**

*   **Enunciado:** Implementa una función que guarde la menor cantidad de intentos necesarios para adivinar el número (la puntuación más alta o *high score*) usando `localStorage` del navegador. Muestra la "Mejor puntuación" en pantalla. Cuando un jugador termine una partida con menos intentos que la puntuación guardada, actualízala. La puntuación debe persistir incluso si se cierra y se vuelve a abrir el navegador.

--- 

**Ejercicio 5: Pistas de "Frío" o "Caliente" (SOLO PARA MÁQUINAS!!!)**

*   **Enunciado:** Mejora las pistas. En lugar de solo decir "demasiado alto" o "demasiado bajo", compara el intento actual con el intento *anterior*. Si el intento actual está más cerca del número secreto que el anterior, añade "¡Más caliente! 🔥" a la pista. Si está más lejos, añade "¡Más frío! 🥶". Necesitarás guardar el intento anterior para hacer la comparación de distancias. (Pista: `Math.abs()` te será útil para calcular la diferencia absoluta).

