const canvas = document.getElementById('tablero');
const ctx = canvas.getContext('2d');
const colorlapiz = document.getElementById('colorlapiz');

let painting = false;
let brushColor = '#000000'; // Color por defecto: negro

// Actualiza el color del pincel cuando se selecciona uno nuevo
colorlapiz.addEventListener('input', (e) => {
    brushColor = e.target.value;
});

// Función para iniciar el dibujo
function startPosition(e) {
    painting = true;
    draw(e);
}

// Función para detener el dibujo
function endPosition() {
    painting = false;
    ctx.beginPath(); // Resetea el camino
}

// Función para dibujar en el canvas
function draw(e) {
    if (!painting) return;

    ctx.lineWidth = 5; // Grosor del pincel
    ctx.lineCap = 'round'; // Bordes redondeados
    ctx.strokeStyle = brushColor; // Usa el color seleccionado

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

// Event Listeners para el dibujo
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);
// Función para limpiar todo el canvas
borrar.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
document.addEventListener("DOMContentLoaded", function () {
    let palabras = [];
    let palabraDibujar = ""; 
    let intervaloPalabras; 
    let tiempoRestante = 60; 

    const tiempoElemento = document.querySelector(".tiempo");
    const chat = document.querySelector(".chat");

    // Cargar las palabras una sola vez
    fetch("palabras.json")
        .then(response => response.json())
        .then(data => {
            palabras = data.map(item => item.palabra); 

            // Seleccionar y eliminar la palabra a dibujar
            palabraDibujar = palabras[Math.floor(Math.random() * palabras.length)]; 
            document.querySelector(".palabra").textContent = `PALABRA A DIBUJAR: ${palabraDibujar}`;

            // ⏳ Iniciar el temporizador
            iniciarTemporizador();

            // 🤖 Iniciar el bot de palabras
            intervaloPalabras = setInterval(enviarPalabraBot, 400);
        })
        .catch(error => console.error("Error cargando las palabras:", error));

    // Función del temporizador
    function iniciarTemporizador() {
        function actualizarTemporizador() {
            tiempoElemento.textContent = `${tiempoRestante}s`; 
            if (tiempoRestante <= 0) {
                clearInterval(intervalo);
                alert("¡Se acabó el tiempo!");
                clearInterval(intervaloPalabras);
            } else {
                tiempoRestante--; 
            }
        }
        const intervalo = setInterval(actualizarTemporizador, 1000);
    }

    // Función para enviar palabras del bot
    function enviarPalabraBot() {
        if (palabras.length === 0) {
            clearInterval(intervaloPalabras);
            return;
        }

        let indiceAleatorio = Math.floor(Math.random() * palabras.length);
        let palabraAleatoria = palabras.splice(indiceAleatorio, 1)[0]; // Eliminar la palabra del array

        let mensajeDiv = document.createElement("div");
        mensajeDiv.classList.add("mensaje");
        mensajeDiv.innerHTML = `<p>BOT</p><p>${palabraAleatoria}</p>`;

        chat.appendChild(mensajeDiv);
        chat.scrollTop = chat.scrollHeight;

        //Verificar si la palabra coincide con la palabra a dibujar
        if (palabraAleatoria === palabraDibujar) {
            alert("¡Se ha adivinado la palabra! Fin del juego.");
            clearInterval(intervaloPalabras);
        }
    }
});
