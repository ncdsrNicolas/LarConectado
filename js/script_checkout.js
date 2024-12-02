const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', function () {
    navLinks.forEach(item => item.classList.remove('active'));
    this.classList.add('active');
  });
});

function confirmLogout() {
    const userConfirmed = confirm("Tem certeza de que deseja deslogar?");

    if (userConfirmed) {
        logout();
    }
}

function logout() {
    localStorage.removeItem('userEmail');
    alert("Você foi deslogado com sucesso!");
    window.location.href = "index.html";
}

$(document).ready(function () {
    $('#nome, #email, #telefone, #cep, #endereco, #numero, #bairro, #cidade').on('input', function() {
        var input = $(this);
        input.next('.erro-msg').remove()
    });
    $('#telefone').on('input', function() {
        if (this.value.length > 11) {
            this.value = this.value.slice(0, 11);
        }
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    $('#numero').on('input', function() {
        if (this.value.length > 5) {
            this.value = this.value.slice(0, 5);
        }
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    $('#cep').on('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
});


function completarCep() {
    var cep = document.getElementById("cep").value.replace(/\D/g, '');
    if (cep.length === 8) {
        $.ajax({
            url: `https://viacep.com.br/ws/${cep}/json/`,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                if (!data.erro) {
                    document.getElementById("endereco").value = data.logradouro;
                    document.getElementById("bairro").value = data.bairro;
                    document.getElementById("cidade").value = data.localidade;
                    document.getElementById("estado").value = data.uf;
                } else {
                    alert("CEP não encontrado!");
                }
            },
            error: function() {
                alert("Erro ao buscar o CEP.");
            }
        });
    } else {
        alert("CEP inválido.");
    }
}

function finalizarPedido() {
    var camposVazios = false;
    var campos = [
        { id: "nome", nome: "Nome" },
        { id: "email", nome: "Email" },
        { id: "telefone", nome: "Telefone" },
        { id: "cep", nome: "CEP" },
        { id: "endereco", nome: "Endereço" },
        { id: "numero", nome: "Número" },
        { id: "bairro", nome: "Bairro" },
        { id: "cidade", nome: "Cidade" }
    ];

    $(".erro-msg").remove();

    campos.forEach(function(campo) {
        var input = $("#" + campo.id);
        if (!input.val()) {
            camposVazios = true;
            input.after('<p class="erro-msg text-danger">O campo ' + campo.nome + ' é obrigatório!</p>');
        }
    });

    var email = $("#email").val();
    if (email && !validateEmail(email)) {
        camposVazios = true;
        $("#email").after('<p class="erro-msg text-danger">O email inserido é inválido!</p>');
    }

    if (camposVazios) {
        return;
    }

    var confirmar = confirm("Tem certeza de que deseja finalizar o pedido?");
    if (confirmar) {
        alert("Seu pedido foi recebido com sucesso!");
        window.location.href = "produtos.html";
    }
}

function validateEmail(email) {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}