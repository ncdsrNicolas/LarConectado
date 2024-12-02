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

let carrinho = [];

function atualizarCarrinho() {
    const tabelaCarrinho = $("#tabelaCarrinho");
    tabelaCarrinho.empty();

    let total = 0;

    if (carrinho.length === 0) {
        const linhaVazia = `
            <tr>
                <td colspan="6" class="text-center">Carrinho vazio</td>
            </tr>
        `;
        tabelaCarrinho.append(linhaVazia);
    } else {
        carrinho.forEach((item, index) => {
            const valorTotal = item.preco * item.quantidade;
            const linha = `
                <tr>
                    <td><img src="${item.img}" width="50" alt="${item.nome}"></td>
                    <td>${item.nome}</td>
                    <td>R$ ${item.preco.toFixed(2)}</td>
                    <td>R$ ${valorTotal.toFixed(2)}</td>
                    <td>
                        <div class="d-flex align-items-center">
                            <button class="btn btn-secondary btn-sm me-2" onclick="diminuirQuantidade(${index})">-</button>
                            ${item.quantidade}
                            <button class="btn btn-secondary btn-sm ms-2" onclick="aumentarQuantidade(${index})">+</button>
                        </div>
                    </td>
                    <td>
                        <button class="btn btn-secondary" onclick="removerItem(${index})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `;
            tabelaCarrinho.append(linha);
            total += valorTotal;
        });
    }

    $("#totalCarrinho").text(total.toFixed(2));

    if (carrinho.length > 0) {
        $("#btnLimparCarrinho").show();
    } else {
        $("#btnLimparCarrinho").hide();
    }
}

function adicionarAoCarrinho(nome, preco, img) {
    preco = parseFloat(preco.replace("R$", "").replace(".", "").replace(",", "."));

    const produtoExistente = carrinho.find(produto => produto.nome === nome);
    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push({ nome, preco, img, quantidade: 1 });
    }
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const tabelaCarrinho = $("#tabelaCarrinho");
    tabelaCarrinho.empty();

    let total = 0;

    if (carrinho.length === 0) {
        const linhaVazia = `
            <tr>
                <td colspan="6" class="text-center">Carrinho vazio</td>
            </tr>
        `;
        tabelaCarrinho.append(linhaVazia);
    } else {
        carrinho.forEach((item, index) => {
            const valorTotal = item.preco * item.quantidade;
            const linha = `
                <tr>
                    <td><img src="${item.img}" width="50" alt="${item.nome}"></td>
                    <td>${item.nome}</td>
                    <td>${formatarPreco(item.preco)}</td> <!-- Ajustado aqui -->
                    <td>${formatarPreco(valorTotal)}</td> <!-- Ajustado aqui -->
                    <td>
                        <div class="d-flex align-items-center">
                            <button class="btn btn-secondary btn-sm me-2" onclick="diminuirQuantidade(${index})">-</button>
                            ${item.quantidade}
                            <button class="btn btn-secondary btn-sm ms-2" onclick="aumentarQuantidade(${index})">+</button>
                        </div>
                    </td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="removerItem(${index})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `;
            tabelaCarrinho.append(linha);
            total += valorTotal;
        });
    }

    $("#totalCarrinho").text(formatarPreco(total));

    if (carrinho.length > 0) {
        $("#btnLimparCarrinho").show();
    } else {
        $("#btnLimparCarrinho").hide();
    }
}

function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function aumentarQuantidade(index) {
    carrinho[index].quantidade++;
    atualizarCarrinho();
}

function diminuirQuantidade(index) {
    if (carrinho[index].quantidade > 1) {
        carrinho[index].quantidade--;
    } else {
        removerItem(index);
    }
    atualizarCarrinho();
}

function limparCarrinho() {
    const userConfirmed = confirm("Tem certeza de que deseja limpar o carrinho?");
    if (userConfirmed) {
        carrinho = [];
        atualizarCarrinho();
    }
}

function realizarPedido() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! Adicione itens antes de realizar o pedido.");
        return;
    }

    const userConfirmed = confirm("Você tem certeza de que deseja realizar o pedido?");
    if (userConfirmed) {
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        window.location.href = "checkout.html";
    } else {
        alert("Pedido cancelado.");
    }
}


$(document).ready(function() {
    atualizarCarrinho();
});
