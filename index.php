<?php
require 'vendor/autoload.php';
session_start();
$uri = "mongodb+srv://angelrp:abc123.@cluster0.76po7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
$client = new MongoDB\Client($uri);
$database = $client->pinturillo;
$collection = $database->usuarios;
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PINTURILLO</title>
    <link rel="stylesheet" href="estilo.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bowlby+One+SC&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

</head>

<body>
    <h1 class="titjuego">PINTURILLO</h1>
    <!-- <button id="selector"><img src="img/sun.png" class="modo" alt=""></button>-->
    <div class="opciones">
    <label for="colorlapiz">ELIGE EL COLOR</label>
    <input type="color" id="colorlapiz" name="colorlapiz" value="#000000">
    <button type="submit" id="borrar">BORRAR</button>
</div>

        <div class="juego">
            <div class="puntos">
                <p>PUNTOS DE:</p>
                <p class="usuario">
                    <?php
                    if (isset($_SESSION['usuario'])) {
                        echo $_SESSION['usuario'];
                    } ?>
                </p>
            </div>
            <div class="dibujo">
                <canvas id="tablero" width="900" height="700"></canvas>
            </div>
            <div class="chat">
                <div class="mensaje">
                    <p>NOMBRE USUARIO> :</p>
                    <p>mensaje</p>
                </div>
            </div>
        </div>

    <script src="src/main.js"></script>

</body>

</html>