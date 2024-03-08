const showHiddenPass = (loginPass, loginEye) => {
  const input = document.getElementById(loginPass), iconEye = document.getElementById(loginEye);

  input.type = 'text';
  iconEye.classList.add('ri-eye-line');
  iconEye.classList.remove('ri-eye-off-line');

  iconEye.addEventListener('click', () => {
    if (input.type === 'password') {
      input.type = 'text';
      iconEye.classList.add('ri-eye-line');
      iconEye.classList.remove('ri-eye-off-line');
    } else {
      input.type = 'password';
      iconEye.classList.remove('ri-eye-line');
      iconEye.classList.add('ri-eye-off-line');
    }
  });
};

const isValidPassword = (password) => {
  const regex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?\/\\-]).{6,}$/;
  return regex.test(password);
};

const validarRequerimientos = (passwordInputId) => {
  const passwordInput = document.getElementById(passwordInputId);

  passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const requerimientos = document.querySelectorAll('.contra-requerimientos');

    requerimientos.forEach(requerimiento => {
      const texto = requerimiento.querySelector('.contra-requeri-text span').innerText;
      const icono = requerimiento.querySelector('.icon-requeri');
      const textoClase = requerimiento.querySelector('.contra-requeri-text');

      if (texto === 'Al menos una Letra' && /[a-zA-Z]/.test(password)) {
        requerimiento.classList.add('cumple-requerimiento');
        icono.classList.remove('fa-solid', 'fa-circle-dot');
        icono.classList.add('bi', 'bi-check2', 'cumple-requerimiento');
        textoClase.classList.add('cumple-requerimiento');

      } else if (texto === 'Al menos un Simbolo' && /[^a-zA-Z0-9]/.test(password)) {
        requerimiento.classList.add('cumple-requerimiento');
        icono.classList.remove('fa-solid', 'fa-circle-dot');
        icono.classList.add('bi', 'bi-check2', 'cumple-requerimiento');
        textoClase.classList.add('cumple-requerimiento');

      } else if (texto === 'La contraseña debe de tener 6 o mas caracteres' && password.length >= 6) {
        requerimiento.classList.add('cumple-requerimiento');
        icono.classList.remove('fa-solid', 'fa-circle-dot');
        icono.classList.add('bi', 'bi-check2', 'cumple-requerimiento');
        textoClase.classList.add('cumple-requerimiento');

      } else {
        requerimiento.classList.remove('cumple-requerimiento');
        icono.classList.remove('bi', 'bi-check2', 'cumple-requerimiento');
        icono.classList.add('fa-solid', 'fa-circle-dot');
        textoClase.classList.remove('cumple-requerimiento');
      }
    });
  });
};
validarRequerimientos('login-pass');

document.addEventListener('DOMContentLoaded', () => {
  showHiddenPass('login-pass', 'login-eye');

  const form = document.getElementById('login-formulario');
  const passwordInput = document.getElementById('login-pass');

  form.addEventListener('submit', (event) => {
    const password = passwordInput.value;
    console.log(isValidPassword(password));

    if (!isValidPassword(password)) {
      event.preventDefault();
    }
  });
});