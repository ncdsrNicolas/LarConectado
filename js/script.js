const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', function () {
    navLinks.forEach(item => item.classList.remove('active'));
    this.classList.add('active');
  });
});

$(document).ready(function () {
  $('#loginForm').on('submit', function (e) {
    e.preventDefault();

    const email = $('#emailForm').val();
    const password = $('#passwordForm').val();

    if (email === 'karin1@fatec.com' && password === 'nicolas2') {
      alert('Login realizado com sucesso!');
      $('#loginModal').modal('hide');

      window.location.href = 'produtos.html';
    } else {
      alert('Credenciais inválidas. Tente novamente.');
    }
  });
});

$(document).ready(function () {
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    const confirmSubmit = confirm("Você tem certeza que deseja enviar a mensagem?");

    if (confirmSubmit) {
      alert("Sua mensagem foi enviada com sucesso!");
      $('#contactForm')[0].reset();
    } else {
      alert("A mensagem não foi enviada.");
    }
  });
});