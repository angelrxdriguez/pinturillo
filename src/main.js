document.addEventListener("DOMContentLoaded", function () {
    let palabras = [];
    let palabraDibujar = "";
    let intervaloPalabras;
    let tiempoRestante = 60;
    let rondas = 3; 

    let puntosUsuario = 0;
    let puntosBot = 0;

    const tiempoElemento = document.querySelector(".tiempo");
    const chat = document.querySelector(".chat");
    const rondasElemento = document.querySelector(".rondas");
    const puntosUsuarioElemento = document.querySelector(".puntos");
    const puntosBotElemento = document.querySelector(".puntosbot");
    const canvas = document.getElementById("tablero");
    const ctx = canvas.getContext("2d");

    let dibujando = false;
    let x = 0, y = 0;

    rondasElemento.textContent = rondas;
    actualizarPuntos();
    document.getElementById("borrar").addEventListener("click", limpiarCanvas);
    function iniciarJuego() {
        fetch("palabras.json")
            .then(response => response.json())
            .then(data => {
                palabras = data.map(item => item.palabra);
                palabraDibujar = palabras[Math.floor(Math.random() * palabras.length)];

                document.querySelector(".palabra").textContent = `PALABRA A DIBUJAR: ${palabraDibujar}`;

                iniciarTemporizador();
                activarDibujo();
                intervaloPalabras = setInterval(enviarPalabraBot, 6000);
            })
            .catch(error => console.error("Error cargando las palabras:", error));
    }

    function iniciarTemporizador() {
        tiempoRestante = 60;
        function actualizarTemporizador() {
            tiempoElemento.textContent = `${tiempoRestante}s`;

            if (tiempoRestante <= 0) {
                clearInterval(intervalo);
                clearInterval(intervaloPalabras);
                alert("SE ACABO EL TIEMPO");
                puntosUsuario++; 
                actualizarPuntos();
                finalizarRonda();
            } else {
                tiempoRestante--;
            }
        }
        const intervalo = setInterval(actualizarTemporizador, 1000);
    }

    function enviarPalabraBot() {
        if (palabras.length === 0) {
            clearInterval(intervaloPalabras);
            return;
        }

        let indiceAleatorio = Math.floor(Math.random() * palabras.length);
        let palabraAleatoria = palabras.splice(indiceAleatorio, 1)[0];

        let mensajeDiv = document.createElement("div");
        mensajeDiv.classList.add("mensaje");
        mensajeDiv.innerHTML = `<p>BOT</p><p>${palabraAleatoria}</p>`;

        chat.appendChild(mensajeDiv);
        chat.scrollTop = chat.scrollHeight;

        if (palabraAleatoria === palabraDibujar) {
            alert("¡El bot ha adivinado la palabra! Fin de la ronda.");
            clearInterval(intervaloPalabras);
            puntosBot++;  
            actualizarPuntos();
            finalizarRonda();
        }
    }

    function finalizarRonda() {
        rondas--; 
        rondasElemento.textContent = rondas;

        if (rondas === 0) {
            window.location.href = "log.html";
        } else {
            chat.innerHTML = "";
            limpiarCanvas();
            iniciarJuego();
        }
    }

    function actualizarPuntos() {
        puntosUsuarioElemento.textContent = `Puntos: ${puntosUsuario}`;
        puntosBotElemento.textContent = `Puntos: ${puntosBot}`;
    }

    function activarDibujo() {
        canvas.addEventListener("mousedown", empezarDibujo);
        canvas.addEventListener("mousemove", dibujar);
        canvas.addEventListener("mouseup", finalizarDibujo);
        canvas.addEventListener("mouseout", finalizarDibujo);
    }

    function empezarDibujo(event) {
        dibujando = true;
        [x, y] = [event.offsetX, event.offsetY];
    }

    function dibujar(event) {
        if (!dibujando) return;

        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.strokeStyle = document.getElementById("colorlapiz").value;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();

        [x, y] = [event.offsetX, event.offsetY];
    }

    function finalizarDibujo() {
        dibujando = false;
    }

    function limpiarCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    iniciarJuego();
});
