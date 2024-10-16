var ACAO_INCLUSAO = "ACAO_INCLUSAO";
var ACAO_ALTERACAO = "ACAO_ALTERACAO";

function carregaTabelaConsulta(aListaDados) {
    // Se não for array, coloca como array
    if (!Array.isArray(aListaDados)) {
        aListaDados = new Array(aListaDados);
    }

    const tabela = document.querySelector("#tabela-produtos");
    tabela.innerHTML = "";
    aListaDados.forEach(function (data, key) {
        const codigo = data.id;
        const nome = data.nome;
        const cpf = data.cpf;
        const cidade = data.cidade;
        const estado = data.estado;

        const acoes = getAcoes(codigo);

        tabela.innerHTML +=
            `
        <tr>
            <td class="text-center">` +
            codigo +
            `</td>
            <td style="text-align: left;">` +
            nome +
            `</td>
            <td class="text-center" style="text-align: right;">` +
            cpf +
            `</td>
            <td class="text-center">` +
            cidade +
            `</td>
            <td class="text-center">` +
            estado +
            `</td>            
            <td>` +
            acoes +
            `</td>
        </tr>
        `;
    });
}

function getAcoes(codigo) {
    return (
        `<div class="acoes text-center">
                <button class="btn btn-warning" onclick="alterarCliente(` +
        codigo +
        `)">Alterar</button>
                <button  class="btn btn-danger" onclick="excluirCliente(` +
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

function incluirCliente() {
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

function confirmarModal() {
    const acao = document.querySelector("#ACAO").value;

    const nome = document.querySelector("#nome").value;
    const cpf = document.querySelector("#cpf").value;
    const endereco = document.querySelector("#endereco").value;
    const numero = document.querySelector("#numero").value;
    const complemento = document.querySelector("#complemento").value;
    const bairro = document.querySelector("#bairro").value;
    const cep = document.querySelector("#cep").value;
    const cidade = document.querySelector("#cidade").value;
    const estado = document.querySelector("#estado").value;

    if (acao == ACAO_INCLUSAO) {
        let body = {
            nome,
            cpf,
            endereco,
            numero,
            complemento,
            bairro,
            cep,
            cidade,
            estado,
        };

        const method = "POST";
        const rota = "cliente";
        callApiPost(
            method,
            rota,
            function (data) {
                console.log("Cliente gravado!" + JSON.stringify(data));
                fecharModal();
                executaConsulta();
            },
            body
        );
    } else if (acao == ACAO_ALTERACAO) {
        const codigo = document.querySelector("#codigo").value;
        let body = {
            id: codigo,
            nome: nome,
            cpf,
            endereco,
            numero,
            complemento,
            bairro,
            cep,
            cidade,
            estado,
        };

        const method = "PUT";
        const rota = "cliente/" + codigo;
        callApiPost(
            method,
            rota,
            function (data) {
                console.log("Cliente alterado!" + JSON.stringify(data));
                fecharModal();
                executaConsulta();
            },
            body
        );
    }
}

function excluirCliente(codigo) {
    const method = "DELETE";
    const rota = "cliente/" + codigo;
    callApi(method, rota, function (data) {
        executaConsulta("consultacliente");
    });
}

function alterarCliente(codigo) {
    const modal = document.querySelector("dialog");
    modal.showModal();
    modal.style.display = "block";

    const method = "GET";
    const rota = "cliente/" + codigo;
    callApi(method, rota, function (data) {
        console.log(data);
        const codigo = data.id;
        const nome = data.nome;
        const cpf = data.cpf;
        const endereco = data.endereco;
        const numero = data.numero;
        const complemento = data.complemento;
        const bairro = data.bairro;
        const cep = data.cep;
        const cidade = data.cidade;
        const estado = data.estado;

        document.querySelector("#codigo").value = codigo;

        document.querySelector("#nome").value = nome;
        document.querySelector("#cpf").value = cpf;
        document.querySelector("#endereco").value = endereco;
        document.querySelector("#numero").value = numero;
        document.querySelector("#complemento").value = complemento;
        document.querySelector("#bairro").value = bairro;
        document.querySelector("#cep").value = cep;
        document.querySelector("#cidade").value = cidade;
        document.querySelector("#estado").value = estado;

        // MUDAR A ACAO PARA "ALTERACAO"
        document.querySelector("#ACAO").value = ACAO_ALTERACAO;
    });
}

function executaConsulta(rota = "consultacliente") {
    const operadorConsulta = document.querySelector("#operadorConsulta").value;

    if (operadorConsulta != "igual" && operadorConsulta != "todos") {
        alert("Operador nao desenvolvido!");
        return false;
    }

    const method = "POST";
    let valor1 = document.querySelector("#campoValor1").value;
    let valor2 = document.querySelector("#campoValor2").value;

    const campoValor = document.querySelector("#filtroConsulta").value;
    const campoConsulta = document.querySelector("#" + campoValor);
    const tipoCampoConsulta = campoConsulta.getAttribute("data-tipo");

    console.log("campo: " + campoValor);
    console.log("operador: " + operadorConsulta);
    console.log("tipoCampoConsulta: " + tipoCampoConsulta);
    console.log("valor1: " + valor1);
    console.log("valor2: " + valor2);

    if (tipoCampoConsulta == "numerico") {
        // valor1 = onlyNumbers(valor1);
        // valor2 = onlyNumbers(valor2);
    }

    let body = {
        campo: campoValor,
        operador: parseOperador(operadorConsulta),
        valor1: valor1,
        valor2: valor2,
    };

    console.log(body);

    callApiPost(
        method,
        rota,
        function (data) {
            if (rota === "consultaproduto") {
                carregaTabelaConsulta(data);
            } else if (rota === "consultacliente") {
                carregaTabelaConsulta(data);
            } else {
                alert("Consulta nao desenvolvida!");
            }
        },
        body
    );
}
