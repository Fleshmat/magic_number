const magia = Math.floor(Math.random() * 100) + 1;
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
                detenerParpadeo();
                detenerSonidoAlerta();
                Swal.fire({
                    title: "¡Felicidades!",
                    icon: "success",
                    text: "Has encontrado el número mágico",
                    heightAuto: false,
                })
            }else{
                
            }
        }
    }
    
    console.log('Magia es: '+magia);
}

// Función para iniciar el temporizador
function iniciarCronometro(tiempo) {
    document.getElementById('tiempoRestante').textContent = tiempo;
    temporizador = setInterval(() => {
        tiempo--;
        document.getElementById('tiempoRestante').textContent = tiempo;

        if (tiempo <= 10 && !parpadeoActivo && !sonidoReproduciendo) {
            activarParpadeo();  // Activar parpadeo cuando queden 10 segundos
            reproducirSonidoAlerta();  // Reproducir el sonido cuando queden 10 segundos
        }

        if (tiempo <= 0) {
            clearInterval(temporizador);
            document.getElementById('error').textContent = "¡Se acabó el tiempo! Has perdido.";
            document.getElementById('botonMagico').disabled = true;
            document.getElementById('pienso').disabled = true;
            detenerSonidoAlerta();
        }
    }, 1000);
}


async function loadPage(){
    const a = await Swal.fire({
        title: "Elegir dificultad",
        icon: "info",
        html: "<div class='swal-div'><select id='ss' placeholder='Seleccionar dificultad...' ><option value='50'>Facil</option><option value='30'>Normal</option><option value='20'>Dificil</option><option value='10'>Pesadilla</option></select></div>",
        allowOutsideClick: false,
        heightAuto: false,
        allowEscapeKey: false,
        confirmButtonText: "Comenzar",

    })

    if(a.isConfirmed){
        let iv = document.getElementById('ss').value;
        iniciarCronometro(iv);
    }
}



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

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    const angle = 45 + x * 90; // Aumenta el rango del ángulo
    const color1 = `rgb(${Math.floor(255 * x)}, ${Math.floor(255 * y)}, 150)`;
    const color2 = `rgb(${Math.floor(255 * (1 - x))}, ${Math.floor(255 * (1 - y))}, 200)`;
    document.body.style.background = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
});
