
let produtos = [
    {nome: 'Produto 1', preco: 10, estoque: 5},
    {nome: 'Produto 2', preco: 20, estoque: 10},
    {nome: 'Produto 3', preco: 30, estoque: 15}
];

function main() {
    let cadastro = document.getElementById('cadastro');
    let listagem = document.getElementById('listagem');
    for (let produto of produtos) {
        cadastro.innerHTML += cadastroProdutoComponent(produto);
        listagem.innerHTML += descricaoProdutoComponent(produto);
    }
}

function cadastroProdutoComponent(produto) {
    let idPreco = getBindId();
    produto.idPreco = idPreco;
    function lerPreco() {
        produto.preco = Number.parseFloat(document.getElementById('it' + idPreco).value);
        if (!produto.preco) produto.preco = 0;
    };
    addBind(idPreco, lerPreco);

    let idEstoque = getBindId();
    produto.idEstoque = idEstoque;
    function lerEstoque() {
        produto.estoque = Number.parseFloat(document.getElementById('it' + idEstoque).value);
        if (!produto.estoque) produto.estoque = 0;
    };
    addBind(idEstoque, lerEstoque);

    return `
        <div class="produto">
            <p>${produto.nome}</p>
            <div class="cadastro">
                <div><label class="descricao-input">Preço:
                    <input id="it${idPreco}" onkeyup="bind(${idPreco})" value="${produto.preco}">
                </label></div>
                <div><label class="descricao-input">Estoque:
                    <input id="it${idEstoque}" onkeyup="bind(${idEstoque})" value="${produto.estoque}">
                </label></div>
            </div>
        </div>
    `;
}

function descricaoProdutoComponent(produto) {
    function atualizarPreco() {
        document.getElementById('lb' + produto.idPreco).innerText = produto.preco;
    };
    addBind(produto.idPreco, atualizarPreco);

    function atualizarEstoque() {
        document.getElementById('lb' + produto.idEstoque).innerText = produto.estoque;
    };
    addBind(produto.idEstoque, atualizarEstoque);

    return `
        <div class="produto">
            <p>${produto.nome}</p>
            <div class="descricao">
                <div class="preco">
                    <label>Preço: </label>
                    <label id="lb${produto.idPreco}">${produto.preco}</label>
                </div>
                <div class="estoque">
                    <label>Estoque: </label>
                    <label id="lb${produto.idEstoque}">${produto.estoque}</label>
                </div>
            </div>
        </div>
    `;
}

let binds = [];
let setters = [];
let bindId = 0;

function getBindId() {
    bindId++;
    return bindId;
}

function addBind(id, func) {
    if (!id || !func) {
        return;
    }
    let bindsOfId = binds.find(b => b.id === id);
    if (!bindsOfId) {
        bindsOfId = {id: id, functions: []};
        binds.push(bindsOfId);
    }
    bindsOfId.functions.push(func);
}

function bind(id) {
    if (!id) {
        return;
    }
    let bind = binds.find(b => b.id === id);
    if (bind) {
        bind.functions.forEach(func => func());
    }
}
