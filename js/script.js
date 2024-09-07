const magia = Math.floor(Math.random() * 100) + 1;
let tiempoRestante = 20;
let temporizador;  // Variable para almacenar el temporizador
let parpadeoActivo = false;  // Controla si el parpadeo está activo
let sonidoReproduciendo = false;  // Controla si el sonido está en reproducción

function magiaFunction(){
    
    let adivinas = parseInt(document.getElementById("pienso").value);
    let error = document.getElementById('error');

    if (isNaN(adivinas) || adivinas < 1 || adivinas > 100) {
        error.textContent = "Introduce un número válido entre 1 y 100";
        return;
    }

    if(magia > adivinas){
        error.textContent = "El número es mayor. ¡Sigue intentando!";
        error.style.display = 'block';
    }else{
        if(magia < adivinas){
            error.textContent = "El número es menor. ¡Sigue intentando!";
            error.style.display = 'block';
        }else{
            if (magia == adivinas) {
                clearInterval(temporizador);
                error.textContent = "¡Felicidades! Adivinaste el número.";
                detenerParpadeo();
                detenerSonidoAlerta();
            }else{
                
            }
        }
    }
    
    console.log('Magia es: '+magia);
}

// Función para iniciar el temporizador
function iniciarCronometro() {
    temporizador = setInterval(() => {
        tiempoRestante--;
        document.getElementById('tiempoRestante').textContent = tiempoRestante;

        if (tiempoRestante <= 10 && !parpadeoActivo && !sonidoReproduciendo) {
            activarParpadeo();  // Activar parpadeo cuando queden 10 segundos
            reproducirSonidoAlerta();  // Reproducir el sonido cuando queden 10 segundos
        }

        if (tiempoRestante <= 0) {
            clearInterval(temporizador);
            document.getElementById('error').textContent = "¡Se acabó el tiempo! Has perdido.";
            document.getElementById('botonMagico').disabled = true;
            document.getElementById('pienso').disabled = true;
            detenerSonidoAlerta();
        }
    }, 1000);
}


window.onload = iniciarCronometro();

function activarParpadeo() {
    const cronometro = document.getElementById('cronometro');
    cronometro.classList.add('urgente');
    cronometro.classList.add('parpadeo');
    parpadeoActivo = true;
}

function detenerParpadeo() {
    const cronometro = document.getElementById('cronometro');
    cronometro.classList.remove('parpadeo');
    cronometro.classList.remove('urgente');
}

function reproducirSonidoAlerta() {
    const sonido = document.getElementById('alertaSonido');
    sonido.play();
    sonidoReproduciendo = true;
}

function detenerSonidoAlerta() {
    const sonido = document.getElementById('alertaSonido');
    sonido.pause();
    sonido.currentTime = 0;
    sonidoReproduciendo = false;
}