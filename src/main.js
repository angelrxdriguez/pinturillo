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