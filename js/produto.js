var ACAO_INCLUSAO = "ACAO_INCLUSAO";
var ACAO_ALTERACAO = "ACAO_ALTERACAO";

function carregaTabelaConsultaProduto(aListaProdutos) {
    debugger;

    // Se não for array, coloca como array
    if (!Array.isArray(aListaProdutos)) {
        aListaProdutos = new Array(aListaProdutos);
    }

    const tabela = document.querySelector("#tabela-produtos");
    tabela.innerHTML = "";
    aListaProdutos.forEach(function (data, key) {
        const codigo = data.id;
        const descricao = data.descricao;
        const preco = data.preco;
        const estoque = data.estoque;

        const acoes = getAcoes(codigo);

        tabela.innerHTML +=
            `
        <tr>
            <td>` +
            codigo +
            `</td>
            <td style="text-align: left;">` +
            descricao +
            `</td>
            <td style="text-align: right;">` +
            preco +
            `</td>
            <td>` +
            estoque +
            `</td>
            <td>` +
            acoes +
            `</td>
        </tr>
        `;
    });
}

// CONSULTA DE PRODUTOS - ALTERAÇÃO/EXCLUSÃO, INSERÇÃO
function getAcoes(codigo) {
    return (
        `<div class="acoes text-center">
                <button class="btn btn-warning" onclick="alterarProduto(` +
        codigo +
        `)">Alterar</button>
                <button  class="btn btn-danger" onclick="excluirProduto(` +
        codigo +
        `)">Excluir</button>
            </div>
    `
    );
}

function fecharModal() {
    const modal = document.querySelector("dialog");
    modal.close();
    modal.style.display = "none";
}

function incluirProduto() {
    const modal = document.querySelector("dialog");
    modal.showModal();
    modal.style.display = "block";

    // limpar o codigo do produto
    document.querySelector("#codigo").value = "";
    // seta a ação para INCLUSAO
    document.querySelector("#ACAO").value = ACAO_INCLUSAO;

    document.querySelector("#descricao").value = "";
    document.querySelector("#preco").value = "";
    document.querySelector("#estoque").value = "";
}

async function confirmarModal() {
    const acao = document.querySelector("#ACAO").value;

    if (acao == ACAO_INCLUSAO) {
        const descricao = document.querySelector("#descricao").value;
        const preco = document.querySelector("#preco").value;
        const estoque = document.querySelector("#estoque").value;

        let body = {
            descricao: descricao,
            preco: getFloatValue(preco),
            estoque: estoque,
        };

        const { data, error } = await SUPABASE_INSTANCE
            .from('produto')
            .insert([
                body,
            ])
            .select();

        if (error) {
            alert("Erro ao inserir!" + JSON.stringify(error));
            return false;
        }

        fecharModal();
        executaConsulta();

        alert("Produto inserido: " + JSON.stringify(data));
    } else if (acao == ACAO_ALTERACAO) {
        // LOGICA DE ALTERACAO
        const codigo = document.querySelector("#codigo").value;
        const descricao = document.querySelector("#descricao").value;
        const preco = document.querySelector("#preco").value;
        const estoque = document.querySelector("#estoque").value;

        let body = {
            descricao: descricao,
            preco: getFloatValue(preco),
            estoque: estoque,
        };

        const port = "produto";
        const { data, error } = await SUPABASE_INSTANCE
            .from(port)
            .update([
                body
            ])
            .eq('id', codigo)
            .select();

        if (error) {
            alert("Erro ao alterar!" + JSON.stringify(error));
            return false;
        }

        console.log("Produto alterado!" + JSON.stringify(data));
        fecharModal();
        executaConsulta();
    }
}

async function excluirProduto(codigo) {
    const { error } = await SUPABASE_INSTANCE
        .from('produto')
        .delete()
        .eq('id', codigo);

    if (error) {
        alert("Erro ao excluir!" + JSON.stringify(error));
        return false;
    }

    executaConsulta();
}

function alterarProduto(codigo) {
    const modal = document.querySelector("dialog");
    modal.showModal();
    modal.style.display = "block";

    const aDadosProduto = getProdutoById(codigo);
    aDadosProduto.then(function (aListaProdutos) {
        aListaProdutos.forEach(function (data, key) {
            const codigo = data.id;
            const descricao = data.descricao;
            const preco = data.preco;
            const estoque = data.estoque;

            document.querySelector("#codigo").value = codigo;
            document.querySelector("#descricao").value = descricao;
            document.querySelector("#preco").value = preco;
            document.querySelector("#estoque").value = estoque;

            // MUDAR A ACAO PARA "ALTERACAO"
            document.querySelector("#ACAO").value = ACAO_ALTERACAO;
        });
    });
}

function executaConsulta(rota = "consultaproduto") {
    const aDados = listarDados("produto");
    aDados.then(function (data) {
        console.log(data);
        if (rota === "consultaproduto") {
            carregaTabelaConsultaProduto(data);
        } else {
            alert("Consulta nao desenvolvida!");
        }
    });
}