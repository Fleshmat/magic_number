document.getElementById('miForm').addEventListener('submit', function(event) {
    const passwordInput = document.getElementById('pass');
    const passwordError = document.getElementById('passwordError');

    const minLengthPattern = /.{8,}/;
    const uppercasePattern = /[A-Z]/;
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
    let isValid = true;

    let errorMessage = '';

    if (!minLengthPattern.test(passwordInput.value)) {
        errorMessage += 'La contraseña debe tener al menos 8 caracteres.<br><br>';
    }

    if (!uppercasePattern.test(passwordInput.value)) {
        errorMessage += 'La contraseña debe tener al menos una letra mayúscula.<br><br>';
    }

    if (!specialCharPattern.test(passwordInput.value)) {
        errorMessage += 'La contraseña debe tener al menos un carácter especial.<br>';
    }

    if (errorMessage) {
        passwordError.innerHTML = errorMessage;
        passwordError.style.display = 'block';
        event.preventDefault();
        isValid = false;
        setTimeout(() => {passwordError.style.display = 'none'}, 4000)
    } else {
        passwordError.style.display = 'none';
    }

    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(emailInput.value)) {
        emailError.textContent = 'Por favor, introduce un correo electrónico válido.';
        emailError.style.display = 'block';
        emailInput.focus();
        event.preventDefault();
        isValid = false;
        setTimeout(() => {emailError.style.display = 'none'}, 4000)
    } else {
        emailError.textContent = '';
    }

    if(isValid){
        const validEmail = document.getElementById('email');
        const validPassword = document.getElementById('pass');
        
        if (validEmail.value === "eventos18@gmail.com" && validPassword.value === "@Event321") {
            // window.location.href = 'https://fleshmat.github.io/curriculum_page/';
        } else {
            event.preventDefault();
            alert('Credenciales inválidas');
        }
    }
    
});

document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordInput = document.getElementById('pass');
    const togglePasswordButton = document.getElementById('togglePassword');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordButton.textContent = 'Ocultar';
    } else {
        passwordInput.type = 'password';
        togglePasswordButton.textContent = 'Mostrar';
    }
});

document.getElementById('loginGoogle').addEventListener('click', function() {
    alert('Redirigiendo a Google para iniciar sesión.');
});

document.getElementById('loginFacebook').addEventListener('click', function() {
    alert('Redirigiendo a Facebook para iniciar sesión.');
});
